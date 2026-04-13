import { SessionData } from './session';

export interface ExtractedFacts {
  personal: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    policy_number?: string;
    amount_needed?: string;
    location?: string;
  };
  incident: {
    type?: string;
    severity?: string;
    location?: string;
    time?: string;
    description?: string;
  };
  intent: {
    primary?: string;
    secondary?: string[];
    urgency?: 'low' | 'medium' | 'high' | 'emergency';
  };
  context: {
    weather_related?: boolean;
    insurance_claim?: boolean;
    legal_matter?: boolean;
    emergency_services?: boolean;
  };
}

export class MemoryEngine {
  private personaMemoryRules: Record<string, MemoryRule[]> = {
    STORM: [
      { pattern: /(damage|damaged|destroyed|broken)/i, category: 'incident', field: 'description' },
      { pattern: /(roof|house|home|property)/i, category: 'incident', field: 'location' },
      { pattern: /(hail|wind|tornado|hurricane)/i, category: 'incident', field: 'type' },
      { pattern: /(emergency|urgent|immediate)/i, category: 'intent', field: 'urgency', value: 'high' },
      { pattern: /(insurance|claim|adjuster)/i, category: 'context', field: 'insurance_claim', value: true }
    ],
    HAIL: [
      { pattern: /(hail|hailstorm|hail damage)/i, category: 'incident', field: 'type', value: 'hail' },
      { pattern: /(size|diameter|large|small)/i, category: 'incident', field: 'severity' },
      { pattern: /(roof|car|window|vehicle)/i, category: 'incident', field: 'description' },
      { pattern: /(insurance|claim)/i, category: 'context', field: 'insurance_claim', value: true }
    ],
    HVAC: [
      { pattern: /(heat|air|cooling|heating|furnace|ac)/i, category: 'incident', field: 'type' },
      { pattern: /(not working|broken|stopped|failed)/i, category: 'incident', field: 'description' },
      { pattern: /(hot|cold|warm|cool)/i, category: 'incident', field: 'severity' },
      { pattern: /(emergency|no heat|no ac)/i, category: 'intent', field: 'urgency', value: 'high' }
    ],
    CLAIMS: [
      { pattern: /(policy|claim|insurance)/i, category: 'context', field: 'insurance_claim', value: true },
      { pattern: /(number|policy number)/i, category: 'personal', field: 'policy_number' },
      { pattern: /(damage|loss|incident)/i, category: 'incident', field: 'description' },
      { pattern: /(urgent|immediate)/i, category: 'intent', field: 'urgency', value: 'high' }
    ],
    LAW: [
      { pattern: /(lawyer|attorney|legal)/i, category: 'context', field: 'legal_matter', value: true },
      { pattern: /(divorce|accident|injury|contract)/i, category: 'incident', field: 'type' },
      { pattern: /(urgent|court|deadline)/i, category: 'intent', field: 'urgency', value: 'high' }
    ],
    MONEY: [
      { pattern: /(loan|credit|finance|mortgage)/i, category: 'intent', field: 'primary' },
      { pattern: /(amount|how much)/i, category: 'personal', field: 'amount_needed' },
      { pattern: /(urgent|emergency)/i, category: 'intent', field: 'urgency', value: 'high' }
    ],
    NEED: [
      { pattern: /(emergency|urgent|help)/i, category: 'context', field: 'emergency_services', value: true },
      { pattern: /(food|shelter|medical)/i, category: 'intent', field: 'primary' },
      { pattern: /(location|where|address)/i, category: 'personal', field: 'location' }
    ]
  };

  async extractFacts(text: string, persona: string): Promise<ExtractedFacts> {
    const facts: ExtractedFacts = {
      personal: {},
      incident: {},
      intent: { secondary: [] },
      context: {}
    };

    const rules = this.personaMemoryRules[persona] || [];

    for (const rule of rules) {
      const matches = text.match(rule.pattern);
      if (matches) {
        this.applyRule(facts, rule, matches, text);
      }
    }

    // Extract common patterns regardless of persona
    this.extractCommonFacts(text, facts);

    return facts;
  }

  private applyRule(
    facts: ExtractedFacts,
    rule: MemoryRule,
    matches: RegExpMatchArray,
    originalText: string
  ) {
    const category = rule.category as keyof ExtractedFacts;
    const field = rule.field;

    if (rule.value !== undefined) {
      // Fixed value rule
      (facts[category] as any)[field] = rule.value;
    } else {
      // Extract from text
      const extracted = this.extractValueFromText(originalText, rule.pattern);
      if (extracted) {
        (facts[category] as any)[field] = extracted;
      }
    }
  }

  private extractCommonFacts(text: string, facts: ExtractedFacts) {
    // Name extraction (simple pattern)
    const nameMatch = text.match(/(?:my name is|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
    if (nameMatch) {
      facts.personal.name = nameMatch[1];
    }

    // Phone extraction
    const phoneMatch = text.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
    if (phoneMatch) {
      facts.personal.phone = phoneMatch[1];
    }

    // Email extraction
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      facts.personal.email = emailMatch[1];
    }

    // Address extraction (basic)
    const addressMatch = text.match(/(\d+\s+[A-Za-z0-9\s,.-]+(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|place|pl|court|ct))/i);
    if (addressMatch) {
      facts.personal.address = addressMatch[1];
    }

    // Urgency detection
    if (text.match(/(emergency|urgent|immediately|asap|right now)/i)) {
      facts.intent.urgency = 'high';
    } else if (text.match(/(soon|quickly|fast)/i)) {
      facts.intent.urgency = 'medium';
    }
  }

  private extractValueFromText(text: string, pattern: RegExp): string | null {
    const match = text.match(pattern);
    return match ? match[0] : null;
  }

  async storeFacts(session: SessionData, facts: ExtractedFacts): Promise<void> {
    // Merge new facts with existing ones
    session.memory.facts = {
      ...session.memory.facts,
      ...facts.personal,
      ...facts.incident,
      ...facts.intent,
      ...facts.context
    };

    // Update context
    session.memory.context = {
      ...session.memory.context,
      lastFactsExtracted: new Date().toISOString(),
      factCount: Object.keys(session.memory.facts).length
    };
  }

  async recallFacts(session: SessionData, query?: string): Promise<Record<string, any>> {
    if (!query) {
      return session.memory.facts;
    }

    // Simple keyword-based recall
    const relevantFacts: Record<string, any> = {};
    const queryLower = query.toLowerCase();

    for (const [key, value] of Object.entries(session.memory.facts)) {
      if (key.toLowerCase().includes(queryLower) ||
          String(value).toLowerCase().includes(queryLower)) {
        relevantFacts[key] = value;
      }
    }

    return relevantFacts;
  }

  async getConversationSummary(session: SessionData): Promise<string> {
    const history = session.memory.history;
    if (history.length === 0) return '';

    const summary = history.map(turn =>
      `Turn ${turn.turn}: ${turn.intent} (${Math.round(turn.confidence * 100)}% confidence)`
    ).join('\n');

    return `Conversation Summary:\n${summary}\n\nKey Facts: ${JSON.stringify(session.memory.facts, null, 2)}`;
  }

  async shouldEscalate(session: SessionData): Promise<boolean> {
    const facts = session.memory.facts;

    // Escalation triggers
    if (facts.urgency === 'emergency') return true;
    if (facts.emergency_services) return true;
    if (session.turnCount > 10) return true; // Too many turns
    if (facts.intent?.primary === 'legal' && facts.urgency === 'high') return true;

    return false;
  }

  async isComplete(session: SessionData): Promise<boolean> {
    const facts = session.memory.facts;

    // Completion criteria vary by persona
    switch (session.persona) {
      case 'STORM':
        return !!(facts.incident?.description && facts.personal?.name);
      case 'CLAIMS':
        return !!(facts.policy_number && facts.incident?.description);
      case 'HVAC':
        return !!(facts.incident?.type && facts.personal?.phone);
      default:
        return session.turnCount >= 3 && Object.keys(facts).length >= 3;
    }
  }
}

interface MemoryRule {
  pattern: RegExp;
  category: string;
  field: string;
  value?: any;
}

export const memoryEngine = new MemoryEngine();