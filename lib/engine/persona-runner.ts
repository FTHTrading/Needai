import { promises as fs } from 'fs';
import path from 'path';
import { SessionData } from './session';
import { MemoryEngine } from './memory';
import { ConversationEngine, ConversationContext, ConversationResponse } from './conversation';
import { conversationEngine } from './conversation';

export interface PersonaResponse {
  text: string;
  actions: string[];
  metadata: {
    sessionId: string;
    turnCount: number;
    isComplete: boolean;
    shouldEscalate: boolean;
    intent: string;
    confidence: number;
  };
}

export class PersonaRunner {
  private memoryEngine: MemoryEngine;
  private conversationEngine: ConversationEngine;
  private personaScripts: Map<string, string> = new Map();

  constructor(memoryEngine: MemoryEngine, conversationEngine: ConversationEngine) {
    this.memoryEngine = memoryEngine;
    this.conversationEngine = conversationEngine;
    this.loadPersonaScripts();
  }

  async processMessage(params: {
    sessionId?: string;
    persona: string;
    message: string;
    callerId?: string;
    callId?: string;
    messageId?: string;
    source: 'call' | 'sms' | 'web';
    weatherContext?: any;
    location?: { state: string; county?: string };
  }): Promise<PersonaResponse> {
    try {
      // Get or create session
      let session = params.sessionId ? await this.loadSession(params.sessionId) : null;

      if (!session) {
        session = await this.createNewSession(params);
      }

      // Extract facts from the message
      const extractedFacts = await this.memoryEngine.extractFacts(params.message, params.persona);

      // Store facts in session
      await this.memoryEngine.storeFacts(session, extractedFacts);

      // Load persona script
      const personaScript = await this.getPersonaScript(params.persona);

      // Build conversation context
      const context: ConversationContext = {
        session,
        currentInput: params.message,
        extractedFacts,
        conversationHistory: session.memory.history,
        personaScript,
        weatherContext: params.weatherContext
      };

      // Process through conversation engine
      const conversationResponse = await this.conversationEngine.processTurn(context);

      // Add conversation turn to session
      await this.addConversationTurn(session.sessionId, {
        input: params.message,
        response: conversationResponse.response,
        extractedFacts,
        intent: conversationResponse.intent,
        confidence: conversationResponse.confidence
      });

      // Execute actions
      await this.executeActions(session.sessionId, conversationResponse.actions);

      // Update session status if needed
      if (conversationResponse.isComplete) {
        await this.completeSession(session.sessionId);
      } else if (conversationResponse.shouldEscalate) {
        await this.escalateSession(session.sessionId);
      }

      // Build final response
      const actions = this.buildActions(conversationResponse);

      return {
        text: conversationResponse.response,
        actions,
        metadata: {
          sessionId: session.sessionId,
          turnCount: session.turnCount,
          isComplete: conversationResponse.isComplete,
          shouldEscalate: conversationResponse.shouldEscalate,
          intent: conversationResponse.intent,
          confidence: conversationResponse.confidence
        }
      };

    } catch (error) {
      console.error('Error processing message:', error);
      throw new Error(`Failed to process message: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getSessionStatus(sessionId: string): Promise<SessionData | null> {
    return await this.loadSession(sessionId);
  }

  async getConversationState(sessionId: string) {
    const session = await this.loadSession(sessionId);
    if (!session) return null;

    return await this.conversationEngine.getConversationState(session);
  }

  private async createNewSession(params: {
    persona: string;
    message: string;
    callerId?: string;
    callId?: string;
    messageId?: string;
    source: 'call' | 'sms' | 'web';
    weatherContext?: any;
    location?: { state: string; county?: string };
  }): Promise<SessionData> {
    const { sessionManager } = await import('./session');

    return await sessionManager.createSession({
      persona: params.persona,
      callerId: params.callerId,
      callId: params.callId,
      messageId: params.messageId,
      source: params.source,
      weatherContext: params.weatherContext,
      location: params.location
    });
  }

  private async loadSession(sessionId: string): Promise<SessionData | null> {
    const { sessionManager } = await import('./session');
    return await sessionManager.loadSession(sessionId);
  }

  private async addConversationTurn(sessionId: string, turn: any) {
    const { sessionManager } = await import('./session');
    await sessionManager.addConversationTurn(sessionId, turn);
  }

  private async completeSession(sessionId: string) {
    const { sessionManager } = await import('./session');
    await sessionManager.completeSession(sessionId);
  }

  private async escalateSession(sessionId: string) {
    const { sessionManager } = await import('./session');
    await sessionManager.escalateSession(sessionId);
  }

  private async loadPersonaScripts() {
    const personasDir = path.join(process.cwd(), 'personas');

    try {
      const files = await fs.readdir(personasDir);

      for (const file of files) {
        if (file.endsWith('.md')) {
          const personaName = file.replace('.md', '').toUpperCase();
          const filePath = path.join(personasDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          this.personaScripts.set(personaName, content);
        }
      }

      console.log(`Loaded ${this.personaScripts.size} persona scripts`);
    } catch (error) {
      console.error('Failed to load persona scripts:', error);
    }
  }

  private async getPersonaScript(persona: string): Promise<string> {
    const script = this.personaScripts.get(persona.toUpperCase());

    if (!script) {
      // Fallback script if persona not found
      return `Hello! I'm here to help with your ${persona.toLowerCase()} needs. How can I assist you today?`;
    }

    return script;
  }

  private async executeActions(sessionId: string, actions: any[]) {
    for (const action of actions) {
      switch (action.type) {
        case 'store_fact':
          // Facts are already stored
          break;
        case 'update_status':
          // Status is updated separately
          break;
        case 'escalate':
          await this.escalateSession(sessionId);
          break;
        case 'complete':
          await this.completeSession(sessionId);
          break;
        case 'follow_up':
          // Follow-up actions are handled in response
          break;
      }
    }
  }

  private buildActions(conversationResponse: ConversationResponse): string[] {
    const actions: string[] = [];

    if (conversationResponse.followUpQuestions.length > 0) {
      actions.push(...conversationResponse.followUpQuestions.map(q => `ASK: ${q}`));
    }

    if (conversationResponse.shouldEscalate) {
      actions.push('ESCALATE: Transfer to human agent');
    }

    if (conversationResponse.isComplete) {
      actions.push('COMPLETE: End conversation and send summary');
    }

    return actions;
  }

  async cleanup() {
    const { sessionManager } = await import('./session');
    const cleaned = await sessionManager.cleanupExpiredSessions();
    console.log(`Cleaned up ${cleaned} expired sessions`);
    return cleaned;
  }
}

export const personaRunner = new PersonaRunner(new MemoryEngine(), conversationEngine);
