import { DisasterType } from './types'

export type NumberCategory =
  | 'legal'
  | 'auto'
  | 'property'
  | 'claims'
  | 'funding'
  | 'medical'
  | 'general'

export interface DisasterRule {
  disaster_type: DisasterType
  applicable_categories: NumberCategory[]
  urgency_multiplier: number // 1.0 = normal, 2.0 = double urgency
  escalation_threshold: number // severity level that triggers escalation
  additional_questions: string[]
}

/**
 * Disaster-to-category mapping rules
 * These are deterministic and inspectable
 */
export const DISASTER_RULES: DisasterRule[] = [
  {
    disaster_type: 'hurricane',
    applicable_categories: ['property', 'auto', 'legal', 'claims', 'medical'],
    urgency_multiplier: 2.5,
    escalation_threshold: 60,
    additional_questions: [
      'Are you currently in a flood zone?',
      'Have you experienced wind damage?',
      'Do you need immediate emergency assistance?'
    ]
  },
  {
    disaster_type: 'storm',
    applicable_categories: ['property', 'auto', 'claims', 'legal'],
    urgency_multiplier: 2.0,
    escalation_threshold: 50,
    additional_questions: [
      'Have you experienced hail damage?',
      'Is there structural damage to your property?',
      'Are you in a safe location?'
    ]
  },
  {
    disaster_type: 'flood',
    applicable_categories: ['property', 'auto', 'claims', 'legal'],
    urgency_multiplier: 2.2,
    escalation_threshold: 55,
    additional_questions: [
      'How high is the water in your area?',
      'Have you documented the damage with photos?',
      'Are you displaced from your home?'
    ]
  },
  {
    disaster_type: 'wildfire',
    applicable_categories: ['property', 'claims', 'legal', 'medical'],
    urgency_multiplier: 2.8,
    escalation_threshold: 65,
    additional_questions: [
      'Are you in an evacuation zone?',
      'Has your property been damaged by fire?',
      'Do you need emergency shelter assistance?'
    ]
  },
  {
    disaster_type: 'tornado',
    applicable_categories: ['property', 'auto', 'medical', 'legal', 'claims'],
    urgency_multiplier: 3.0,
    escalation_threshold: 70,
    additional_questions: [
      'Are you injured or do you know someone who is?',
      'Is your home structurally damaged?',
      'Do you need immediate medical attention?'
    ]
  },
  {
    disaster_type: 'hail',
    applicable_categories: ['property', 'auto', 'claims'],
    urgency_multiplier: 1.8,
    escalation_threshold: 45,
    additional_questions: [
      'What is the size of the hail?',
      'Is there visible damage to your roof or vehicle?',
      'Have you contacted your insurance yet?'
    ]
  },
  {
    disaster_type: 'winter',
    applicable_categories: ['property', 'auto', 'medical', 'claims'],
    urgency_multiplier: 1.5,
    escalation_threshold: 40,
    additional_questions: [
      'Are you experiencing power outages?',
      'Have you experienced frozen pipes or water damage?',
      'Do you need emergency heat or shelter?'
    ]
  }
]

/**
 * Get applicable categories for a disaster type
 */
export function getApplicableCategories(disasterType: DisasterType): NumberCategory[] {
  const rule = DISASTER_RULES.find(r => r.disaster_type === disasterType)
  return rule?.applicable_categories || []
}

/**
 * Get disaster rule for a specific disaster type
 */
export function getDisasterRule(disasterType: DisasterType): DisasterRule | undefined {
  return DISASTER_RULES.find(r => r.disaster_type === disasterType)
}

/**
 * Check if a category is affected by a disaster
 */
export function isCategoryAffected(category: NumberCategory, disasterType: DisasterType): boolean {
  const applicableCategories = getApplicableCategories(disasterType)
  return applicableCategories.includes(category)
}

/**
 * Get urgency multiplier for disaster + category combination
 */
export function getUrgencyMultiplier(category: NumberCategory, disasterType: DisasterType): number {
  const rule = getDisasterRule(disasterType)
  if (!rule || !isCategoryAffected(category, disasterType)) {
    return 1.0 // Normal urgency
  }
  return rule.urgency_multiplier
}

/**
 * Get escalation threshold for disaster + category
 */
export function getEscalationThreshold(category: NumberCategory, disasterType: DisasterType): number {
  const rule = getDisasterRule(disasterType)
  if (!rule || !isCategoryAffected(category, disasterType)) {
    return 100 // Never escalate by default
  }
  return rule.escalation_threshold
}

/**
 * Get additional questions for disaster + category
 */
export function getAdditionalQuestions(category: NumberCategory, disasterType: DisasterType): string[] {
  const rule = getDisasterRule(disasterType)
  if (!rule || !isCategoryAffected(category, disasterType)) {
    return []
  }
  return rule.additional_questions
}

/**
 * Calculate overall risk score for multiple disasters affecting a category
 */
export function calculateCategoryRiskScore(
  category: NumberCategory,
  disasters: Array<{ type: DisasterType; severity: number }>
): number {
  let totalRisk = 0
  let applicableCount = 0

  for (const disaster of disasters) {
    if (isCategoryAffected(category, disaster.type)) {
      const urgency = getUrgencyMultiplier(category, disaster.type)
      const weightedSeverity = disaster.severity * urgency
      totalRisk += weightedSeverity
      applicableCount++
    }
  }

  return applicableCount > 0 ? Math.min(100, totalRisk / applicableCount) : 0
}