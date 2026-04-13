import { promises as fs } from 'fs';
import path from 'path';

export interface SessionData {
  sessionId: string;
  persona: string;
  callerId?: string;
  callId?: string;
  messageId?: string;
  createdAt: string;
  lastActivity: string;
  turnCount: number;
  status: 'active' | 'completed' | 'escalated' | 'expired';
  memory: {
    facts: Record<string, any>;
    context: Record<string, any>;
    history: ConversationTurn[];
  };
  metadata: {
    source: 'call' | 'sms' | 'web';
    priority: 'low' | 'medium' | 'high' | 'emergency';
    weatherContext?: any;
    location?: {
      state: string;
      county?: string;
    };
  };
}

export interface ConversationTurn {
  turn: number;
  timestamp: string;
  input: string;
  response: string;
  extractedFacts: Record<string, any>;
  intent: string;
  confidence: number;
}

export class SessionManager {
  private sessionsDir: string;
  private sessionTimeout: number = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.sessionsDir = path.join(process.cwd(), 'data', 'sessions');
    this.ensureSessionsDir();
  }

  private async ensureSessionsDir() {
    try {
      await fs.mkdir(this.sessionsDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create sessions directory:', error);
    }
  }

  async createSession(params: {
    persona: string;
    callerId?: string;
    callId?: string;
    messageId?: string;
    source: 'call' | 'sms' | 'web';
    priority?: 'low' | 'medium' | 'high' | 'emergency';
    weatherContext?: any;
    location?: { state: string; county?: string };
  }): Promise<SessionData> {
    const sessionId = this.generateSessionId();
    const now = new Date().toISOString();

    const session: SessionData = {
      sessionId,
      persona: params.persona,
      callerId: params.callerId,
      callId: params.callId,
      messageId: params.messageId,
      createdAt: now,
      lastActivity: now,
      turnCount: 0,
      status: 'active',
      memory: {
        facts: {},
        context: {},
        history: []
      },
      metadata: {
        source: params.source,
        priority: params.priority || 'medium',
        weatherContext: params.weatherContext,
        location: params.location
      }
    };

    await this.saveSession(session);
    return session;
  }

  async loadSession(sessionId: string): Promise<SessionData | null> {
    try {
      const filePath = path.join(this.sessionsDir, `${sessionId}.json`);
      const data = await fs.readFile(filePath, 'utf-8');
      const session: SessionData = JSON.parse(data);

      // Check if session has expired
      if (this.isExpired(session)) {
        session.status = 'expired';
        await this.saveSession(session);
        return null;
      }

      return session;
    } catch (error) {
      console.error(`Failed to load session ${sessionId}:`, error);
      return null;
    }
  }

  async saveSession(session: SessionData): Promise<void> {
    try {
      const filePath = path.join(this.sessionsDir, `${session.sessionId}.json`);
      await fs.writeFile(filePath, JSON.stringify(session, null, 2));
    } catch (error) {
      console.error(`Failed to save session ${session.sessionId}:`, error);
      throw error;
    }
  }

  async updateSession(sessionId: string, updates: Partial<SessionData>): Promise<SessionData | null> {
    const session = await this.loadSession(sessionId);
    if (!session) return null;

    const updatedSession = {
      ...session,
      ...updates,
      lastActivity: new Date().toISOString()
    };

    await this.saveSession(updatedSession);
    return updatedSession;
  }

  async addConversationTurn(
    sessionId: string,
    turn: Omit<ConversationTurn, 'turn' | 'timestamp'>
  ): Promise<SessionData | null> {
    const session = await this.loadSession(sessionId);
    if (!session) return null;

    const newTurn: ConversationTurn = {
      ...turn,
      turn: session.turnCount + 1,
      timestamp: new Date().toISOString()
    };

    session.memory.history.push(newTurn);
    session.turnCount = newTurn.turn;
    session.lastActivity = newTurn.timestamp;

    await this.saveSession(session);
    return session;
  }

  async expireSession(sessionId: string): Promise<void> {
    const session = await this.loadSession(sessionId);
    if (session) {
      session.status = 'expired';
      await this.saveSession(session);
    }
  }

  async completeSession(sessionId: string): Promise<void> {
    const session = await this.loadSession(sessionId);
    if (session) {
      session.status = 'completed';
      await this.saveSession(session);
    }
  }

  async escalateSession(sessionId: string): Promise<void> {
    const session = await this.loadSession(sessionId);
    if (session) {
      session.status = 'escalated';
      await this.saveSession(session);
    }
  }

  async getActiveSessions(): Promise<SessionData[]> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      const sessions: SessionData[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const sessionId = file.replace('.json', '');
          const session = await this.loadSession(sessionId);
          if (session && session.status === 'active') {
            sessions.push(session);
          }
        }
      }

      return sessions;
    } catch (error) {
      console.error('Failed to get active sessions:', error);
      return [];
    }
  }

  async cleanupExpiredSessions(): Promise<number> {
    try {
      const files = await fs.readdir(this.sessionsDir);
      let cleaned = 0;

      for (const file of files) {
        if (file.endsWith('.json')) {
          const sessionId = file.replace('.json', '');
          const session = await this.loadSession(sessionId);
          if (session && this.isExpired(session)) {
            await this.expireSession(sessionId);
            cleaned++;
          }
        }
      }

      return cleaned;
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error);
      return 0;
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private isExpired(session: SessionData): boolean {
    const lastActivity = new Date(session.lastActivity);
    const now = new Date();
    return (now.getTime() - lastActivity.getTime()) > this.sessionTimeout;
  }
}

export const sessionManager = new SessionManager();