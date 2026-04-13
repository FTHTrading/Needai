import { SessionData, ConversationTurn } from './session';
import { ExtractedFacts, MemoryEngine } from './memory';

export interface ConversationContext {
  session: SessionData;
  currentInput: string;
  extractedFacts: ExtractedFacts;
  conversationHistory: ConversationTurn[];
  personaScript: string;
  weatherContext?: any;
}

export interface ConversationResponse {
  response: string;
  followUpQuestions: string[];
  isComplete: boolean;
  shouldEscalate: boolean;
  intent: string;
  confidence: number;
  actions: ConversationAction[];
}

export interface ConversationAction {
  type: 'store_fact' | 'update_status' | 'escalate' | 'complete' | 'follow_up';
  data: any;
}

export class ConversationEngine {
  private memoryEngine: MemoryEngine;

  constructor(memoryEngine: MemoryEngine) {
    this.memoryEngine = memoryEngine;
  }

  async processTurn(context: ConversationContext): Promise<ConversationResponse> {
    const { session, currentInput, extractedFacts } = context;

    // Analyze intent and confidence
    const intentAnalysis = await this.analyzeIntent(currentInput, session.persona);
    const confidence = this.calculateConfidence(extractedFacts, intentAnalysis);

    // Generate response based on persona and context
    const response = await this.generateResponse(context, intentAnalysis);

    // Determine if conversation is complete
    const isComplete = await this.memoryEngine.isComplete(session);

    // Check if escalation is needed
    const shouldEscalate = await this.memoryEngine.shouldEscalate(session);

    // Generate follow-up questions
    const followUpQuestions = this.generateFollowUpQuestions(session, extractedFacts, isComplete);

    // Determine actions to take
    const actions = this.determineActions(session, extractedFacts, isComplete, shouldEscalate);

    return {
      response,
      followUpQuestions,
      isComplete,
      shouldEscalate,
      intent: intentAnalysis.intent,
      confidence,
      actions
    };
  }

  private async analyzeIntent(input: string, persona: string): Promise<{ intent: string; keywords: string[] }> {
    const inputLower = input.toLowerCase();

    // Persona-specific intent patterns
    const intentPatterns: Record<string, { intent: string; patterns: RegExp[] }[]> = {
      STORM: [
        { intent: 'report_damage', patterns: [/damage/i, /roof/i, /house/i, /property/i] },
        { intent: 'insurance_claim', patterns: [/insurance/i, /claim/i, /adjuster/i] },
        { intent: 'emergency_help', patterns: [/emergency/i, /urgent/i, /help/i] },
        { intent: 'status_update', patterns: [/status/i, /update/i, /information/i] }
      ],
      HAIL: [
        { intent: 'hail_damage', patterns: [/hail/i, /damage/i, /roof/i, /car/i] },
        { intent: 'size_report', patterns: [/size/i, /large/i, /small/i, /diameter/i] },
        { intent: 'insurance', patterns: [/insurance/i, /claim/i] }
      ],
      HVAC: [
        { intent: 'repair_request', patterns: [/repair/i, /fix/i, /broken/i, /not working/i] },
        { intent: 'diagnostic', patterns: [/hot/i, /cold/i, /noise/i, /smell/i] },
        { intent: 'emergency', patterns: [/emergency/i, /no heat/i, /no ac/i] }
      ],
      CLAIMS: [
        { intent: 'file_claim', patterns: [/file/i, /claim/i, /submit/i] },
        { intent: 'status_check', patterns: [/status/i, /check/i, /update/i] },
        { intent: 'policy_info', patterns: [/policy/i, /number/i, /information/i] }
      ],
      LAW: [
        { intent: 'legal_consultation', patterns: [/lawyer/i, /attorney/i, /legal/i] },
        { intent: 'case_intake', patterns: [/divorce/i, /accident/i, /injury/i, /contract/i] },
        { intent: 'urgent_legal', patterns: [/urgent/i, /court/i, /deadline/i] }
      ],
      MONEY: [
        { intent: 'loan_inquiry', patterns: [/loan/i, /credit/i, /finance/i] },
        { intent: 'application', patterns: [/apply/i, /application/i, /process/i] },
        { intent: 'qualification', patterns: [/qualify/i, /eligible/i, /requirements/i] }
      ],
      NEED: [
        { intent: 'emergency_services', patterns: [/emergency/i, /urgent/i, /help/i] },
        { intent: 'resource_request', patterns: [/food/i, /shelter/i, /medical/i] },
        { intent: 'information', patterns: [/information/i, /where/i, /how/i] }
      ]
    };

    const patterns = intentPatterns[persona] || [];
    const matchedKeywords: string[] = [];

    for (const { intent, patterns: regexes } of patterns) {
      for (const regex of regexes) {
        if (regex.test(inputLower)) {
          matchedKeywords.push(intent);
          if (matchedKeywords.length >= 2) break; // Limit to top 2 intents
        }
      }
      if (matchedKeywords.length >= 2) break;
    }

    const primaryIntent = matchedKeywords[0] || 'general_inquiry';

    return {
      intent: primaryIntent,
      keywords: matchedKeywords
    };
  }

  private calculateConfidence(facts: ExtractedFacts, intentAnalysis: { intent: string; keywords: string[] }): number {
    let confidence = 0.5; // Base confidence

    // Increase confidence based on extracted facts
    if (facts.personal.name) confidence += 0.1;
    if (facts.personal.phone) confidence += 0.1;
    if (facts.incident.type) confidence += 0.15;
    if (facts.incident.description) confidence += 0.1;
    if (facts.intent.primary) confidence += 0.1;

    // Increase based on intent clarity
    confidence += Math.min(intentAnalysis.keywords.length * 0.1, 0.2);

    return Math.min(confidence, 1.0);
  }

  private async generateResponse(
    context: ConversationContext,
    intentAnalysis: { intent: string; keywords: string[] }
  ): Promise<string> {
    const { session, extractedFacts, personaScript } = context;

    // Use persona script as base, enhanced with memory
    let response = personaScript;

    // Add memory-enhanced content
    if (session.memory.facts.name) {
      response = response.replace(/\{name\}/g, session.memory.facts.name);
    }

    // Add contextual responses based on intent
    const contextualResponse = this.getContextualResponse(intentAnalysis.intent, session, extractedFacts);
    if (contextualResponse) {
      response += '\n\n' + contextualResponse;
    }

    return response;
  }

  private getContextualResponse(intent: string, session: SessionData, facts: ExtractedFacts): string | null {
    switch (intent) {
      case 'report_damage':
        if (session.persona === 'STORM') {
          return "I've noted the damage details. Do you have photos of the damage that you can share?";
        }
        break;

      case 'insurance_claim':
        if (facts.context.insurance_claim) {
          return "I can help you start the insurance claim process. What's your policy number?";
        }
        break;

      case 'emergency_help':
        return "This sounds like an emergency situation. Let me connect you with immediate assistance.";

      case 'repair_request':
        if (session.persona === 'HVAC') {
          return "I understand you're having heating/cooling issues. Can you tell me what symptoms you're experiencing?";
        }
        break;
    }

    return null;
  }

  private generateFollowUpQuestions(session: SessionData, facts: ExtractedFacts, isComplete: boolean): string[] {
    if (isComplete) return [];

    const questions: string[] = [];
    const persona = session.persona;

    // Persona-specific follow-up questions
    switch (persona) {
      case 'STORM':
        if (!facts.incident.description) questions.push("Can you describe the damage to your property?");
        if (!facts.personal.name) questions.push("May I have your name for our records?");
        if (!facts.personal.phone) questions.push("What's the best phone number to reach you at?");
        break;

      case 'HAIL':
        if (!facts.incident.severity) questions.push("What size were the hail stones? (e.g., pea-sized, golf ball-sized)");
        if (!facts.incident.location) questions.push("Which part of your property was damaged? (roof, vehicle, etc.)");
        break;

      case 'HVAC':
        if (!facts.incident.type) questions.push("Is this a heating or cooling issue?");
        if (!facts.incident.description) questions.push("What exactly is happening with your system?");
        break;

      case 'CLAIMS':
        if (!facts.personal.policy_number) questions.push("What's your insurance policy number?");
        if (!facts.incident.time) questions.push("When did the incident occur?");
        break;

      case 'LAW':
        if (!facts.incident.type) questions.push("What type of legal matter do you need assistance with?");
        if (!facts.intent.urgency) questions.push("How urgent is this matter?");
        break;

      case 'MONEY':
        if (!facts.personal.amount_needed) questions.push("What amount are you looking to borrow or finance?");
        if (!facts.intent.primary) questions.push("What type of financial product are you interested in?");
        break;

      case 'NEED':
        if (!facts.intent.primary) questions.push("What specific type of assistance are you seeking?");
        if (!facts.personal.location) questions.push("What's your current location or address?");
        break;
    }

    return questions.slice(0, 2); // Limit to 2 questions max
  }

  private determineActions(
    session: SessionData,
    facts: ExtractedFacts,
    isComplete: boolean,
    shouldEscalate: boolean
  ): ConversationAction[] {
    const actions: ConversationAction[] = [];

    // Always store facts
    actions.push({
      type: 'store_fact',
      data: facts
    });

    if (isComplete) {
      actions.push({
        type: 'complete',
        data: { reason: 'conversation_complete' }
      });
    }

    if (shouldEscalate) {
      actions.push({
        type: 'escalate',
        data: { reason: 'high_priority_or_complexity' }
      });
    }

    if (session.turnCount > 5 && !isComplete) {
      actions.push({
        type: 'follow_up',
        data: { reason: 'extended_conversation' }
      });
    }

    return actions;
  }

  async getConversationState(session: SessionData): Promise<{
    summary: string;
    nextSteps: string[];
    priority: string;
  }> {
    const summary = await this.memoryEngine.getConversationSummary(session);
    const isComplete = await this.memoryEngine.isComplete(session);
    const shouldEscalate = await this.memoryEngine.shouldEscalate(session);

    const nextSteps: string[] = [];

    if (shouldEscalate) {
      nextSteps.push('Escalate to human agent');
    } else if (isComplete) {
      nextSteps.push('Complete intake process');
      nextSteps.push('Send confirmation to caller');
    } else {
      nextSteps.push('Continue conversation');
      nextSteps.push('Ask follow-up questions');
    }

    return {
      summary,
      nextSteps,
      priority: session.metadata.priority
    };
  }
}

export const conversationEngine = new ConversationEngine(new MemoryEngine());
