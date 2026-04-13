import { WeatherContext, DisasterType } from '../weather/types';
import { getApplicableCategories } from '../weather/disaster_rules';

export interface IntakeRequest {
  location: string;
  businessType: string;
  targetAudience: string;
  budget: number;
  urgency: 'low' | 'medium' | 'high';
  weatherContext?: WeatherContext;
}

export interface IntakeRecommendation {
  recommendedNumbers: string[];
  aiConfiguration: {
    routingRules: string[];
    marketingStrategy: string[];
    riskMitigation: string[];
  };
  weatherInfluencedDecisions: string[];
  estimatedCost: number;
  confidence: number;
}

export class AIIntakeEngine {
  private weatherProvider: any; // Will be injected

  constructor(weatherProvider: any) {
    this.weatherProvider = weatherProvider;
  }

  async processIntake(request: IntakeRequest): Promise<IntakeRecommendation> {
    // Get current weather context if not provided
    const weatherContext = request.weatherContext || await this.weatherProvider.getCurrentWeather(request.location);

    // Analyze weather and disaster risks
    const disasterTypes = weatherContext.active_events.map((event: WeatherContext['active_events'][0]) => event.type);
    const applicableCategories = disasterTypes.flatMap((type: DisasterType) => getApplicableCategories(type));
    const riskMultiplier = this.calculateRiskMultiplier(weatherContext);

    // Generate weather-influenced recommendations
    const weatherInfluencedDecisions = this.generateWeatherDecisions(weatherContext, applicableCategories);

    // Recommend numbers based on business type, weather context, and risk
    const recommendedNumbers = this.recommendNumbers(request, applicableCategories, riskMultiplier);

    // Generate AI configuration
    const aiConfiguration = this.generateAIConfiguration(request, weatherContext, applicableCategories);

    // Calculate estimated cost with weather risk adjustment
    const estimatedCost = this.calculateEstimatedCost(request, riskMultiplier);

    // Calculate confidence based on weather data completeness
    const confidence = this.calculateConfidence(weatherContext);

    return {
      recommendedNumbers,
      aiConfiguration,
      weatherInfluencedDecisions,
      estimatedCost,
      confidence
    };
  }

  private generateWeatherDecisions(weatherContext: WeatherContext, applicableCategories: string[]): string[] {
    const decisions: string[] = [];

    // Get disaster types from active events
    const disasterTypes = weatherContext.active_events.map((event: WeatherContext['active_events'][0]) => event.type);

    // Weather-based routing decisions based on disaster types
    if (disasterTypes.includes('heat')) {
      decisions.push("Prioritizing heat-resistant infrastructure numbers for emergency services");
    }

    if (disasterTypes.includes('storm') || disasterTypes.includes('hurricane')) {
      decisions.push("Recommending moisture-resistant equipment for high-humidity areas");
    }

    if (disasterTypes.includes('storm') || disasterTypes.includes('hurricane') || disasterTypes.includes('tornado')) {
      decisions.push("Suggesting wind-resistant communication towers in windy regions");
    }

    // Disaster-specific decisions
    if (applicableCategories.includes('hurricane')) {
      decisions.push("Activating hurricane preparedness protocols with redundant backup systems");
    }

    if (applicableCategories.includes('flood')) {
      decisions.push("Implementing flood-resistant infrastructure with elevated equipment placement");
    }

    if (applicableCategories.includes('earthquake')) {
      decisions.push("Deploying seismic-resistant communication infrastructure");
    }

    if (applicableCategories.includes('wildfire')) {
      decisions.push("Establishing wildfire evacuation communication networks");
    }

    return decisions;
  }

  private recommendNumbers(
    request: IntakeRequest,
    applicableCategories: string[],
    riskMultiplier: number
  ): string[] {
    const recommendations: string[] = [];

    // Base recommendations by business type
    const baseNumbers = this.getBaseNumbersByBusinessType(request.businessType);

    // Apply weather and disaster filtering
    const weatherFilteredNumbers = baseNumbers.filter(number => {
      // Filter based on applicable categories and risk
      if (applicableCategories.includes('emergency') && riskMultiplier > 1.5) {
        return number.includes('911') || number.includes('EMERGENCY');
      }

      if (applicableCategories.includes('weather') && riskMultiplier > 1.2) {
        return number.includes('WEATHER') || number.includes('ALERT');
      }

      return true; // Include all for low-risk scenarios
    });

    // Add weather-specific numbers if high risk
    if (riskMultiplier > 1.3) {
      recommendations.push(...this.getWeatherSpecificNumbers(applicableCategories));
    }

    // Combine and deduplicate
    const allRecommendations = [...new Set([...weatherFilteredNumbers, ...recommendations])];

    return allRecommendations.slice(0, 5); // Limit to top 5 recommendations
  }

  private getBaseNumbersByBusinessType(businessType: string): string[] {
    const numberMap: { [key: string]: string[] } = {
      'emergency': ['911-HELP-NOW', 'EMERGENCY-1', 'DISASTER-HELP'],
      'retail': ['SHOP-NOW-247', 'DEALS-TODAY', 'SALES-HELP'],
      'healthcare': ['HEALTH-FIRST', 'MEDICAL-HELP', 'CARE-NOW'],
      'hospitality': ['BOOK-NOW-365', 'HOTEL-HELP', 'TRAVEL-EASY'],
      'finance': ['MONEY-MATTERS', 'FINANCE-HELP', 'BANK-NOW'],
      'education': ['LEARN-TODAY', 'SCHOOL-HELP', 'STUDY-NOW'],
      'government': ['GOV-HELP-DESK', 'PUBLIC-SERVICE', 'CITIZEN-HELP'],
      'technology': ['TECH-SUPPORT', 'DIGITAL-HELP', 'CODE-NOW'],
      'real-estate': ['HOME-FINDER', 'PROPERTY-HELP', 'REALTY-NOW'],
      'automotive': ['CAR-HELP-NOW', 'AUTO-SERVICE', 'VEHICLE-HELP']
    };

    return numberMap[businessType.toLowerCase()] || ['HELP-NOW-247', 'SERVICE-FIRST', 'CALL-US-NOW'];
  }

  private getWeatherSpecificNumbers(applicableCategories: string[]): string[] {
    const weatherNumbers: { [key: string]: string[] } = {
      'hurricane': ['HURRICANE-HELP', 'STORM-ALERT', 'EVACUATE-NOW'],
      'flood': ['FLOOD-WARNING', 'WATER-RESCUE', 'HIGH-WATER'],
      'earthquake': ['QUAKE-ALERT', 'AFTERSHOCK', 'SEISMIC-HELP'],
      'wildfire': ['FIRE-WATCH', 'EVACUATION', 'SMOKE-ALERT'],
      'tornado': ['TORNADO-SIREN', 'STORM-CELLAR', 'WIND-DAMAGE'],
      'blizzard': ['SNOW-STORM', 'ICE-ALERT', 'WINTER-HELP'],
      'heatwave': ['HEAT-ALERT', 'COOLING-CENTER', 'SUN-STROKE'],
      'drought': ['WATER-CONSERVE', 'DROUGHT-HELP', 'DRY-SPELL']
    };

    const relevantNumbers: string[] = [];
    applicableCategories.forEach(category => {
      if (weatherNumbers[category]) {
        relevantNumbers.push(...weatherNumbers[category]);
      }
    });

    return relevantNumbers;
  }

  private generateAIConfiguration(
    request: IntakeRequest,
    weatherContext: WeatherContext,
    applicableCategories: string[]
  ): { routingRules: string[]; marketingStrategy: string[]; riskMitigation: string[] } {
    const routingRules: string[] = [];
    const marketingStrategy: string[] = [];
    const riskMitigation: string[] = [];

    // Weather-based routing rules
    const disasterTypes = weatherContext.active_events.map((event: WeatherContext['active_events'][0]) => event.type);

    if (disasterTypes.includes('heat')) {
      routingRules.push("Route heat-related calls to specialized cooling assistance teams");
    }

    if (disasterTypes.includes('storm') || disasterTypes.includes('hurricane') || disasterTypes.includes('tornado')) {
      routingRules.push("Prioritize infrastructure damage reports in high-wind conditions");
    }

    // Disaster-specific routing
    if (applicableCategories.includes('hurricane')) {
      routingRules.push("Activate emergency routing protocols for hurricane season");
      riskMitigation.push("Implement redundant communication channels for storm outages");
    }

    if (applicableCategories.includes('flood')) {
      routingRules.push("Route flood-related calls to water rescue coordination");
      riskMitigation.push("Deploy satellite backup systems for flood-prone areas");
    }

    // Marketing strategy adjustments
    if (applicableCategories.includes('weather')) {
      marketingStrategy.push("Adjust messaging for weather-impacted customer behavior");
      marketingStrategy.push("Promote weather-resistant products and services");
    }

    // Urgency-based configurations
    if (request.urgency === 'high') {
      routingRules.push("Enable 24/7 emergency response routing");
      riskMitigation.push("Activate all redundant systems and backup protocols");
    }

    return { routingRules, marketingStrategy, riskMitigation };
  }

  private calculateEstimatedCost(request: IntakeRequest, riskMultiplier: number): number {
    const baseCost = 500; // Base monthly cost
    const businessMultiplier = this.getBusinessMultiplier(request.businessType);
    const urgencyMultiplier = request.urgency === 'high' ? 1.5 : request.urgency === 'medium' ? 1.2 : 1.0;
    const budgetMultiplier = Math.min(request.budget / 1000, 2.0); // Cap at 2x for high budgets

    return Math.round(baseCost * businessMultiplier * urgencyMultiplier * riskMultiplier * budgetMultiplier);
  }

  private getBusinessMultiplier(businessType: string): number {
    const multipliers: { [key: string]: number } = {
      'emergency': 2.0,
      'healthcare': 1.8,
      'government': 1.6,
      'finance': 1.5,
      'technology': 1.4,
      'retail': 1.2,
      'hospitality': 1.1,
      'education': 1.0,
      'real-estate': 1.0,
      'automotive': 1.0
    };

    return multipliers[businessType.toLowerCase()] || 1.0;
  }

  private calculateRiskMultiplier(weatherContext: WeatherContext): number {
    if (weatherContext.active_events.length === 0) {
      return 1.0; // No risk
    }

    // Calculate average risk across all events
    const totalRisk = weatherContext.active_events.reduce((sum, event) => {
      return sum + (event.severity / 100); // Normalize to 0-1
    }, 0);

    const averageRisk = totalRisk / weatherContext.active_events.length;

    // Convert to multiplier (1.0 to 3.0 range)
    return 1.0 + (averageRisk * 2.0);
  }

  private calculateConfidence(weather: WeatherContext): number {
    if (weather.active_events.length === 0) return 0.6
    if (weather.risk_score > 70) return 0.95
    if (weather.risk_score > 40) return 0.85
    return 0.75
  }
}
