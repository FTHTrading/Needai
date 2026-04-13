import { WeatherContext } from './types';

export class WeatherProvider {
  private cache = new Map<
    string,
    { data: WeatherContext; timestamp: number }
  >()

  private readonly CACHE_TTL = 15 * 60 * 1000 // 15 minutes

  /**
   * Get current weather for a location (simplified interface for intake engine)
   */
  async getCurrentWeather(location: string): Promise<WeatherContext> {
    // Parse location (assume format "City, State")
    const state = location.split(',')[1]?.trim() || location;
    return this.getWeatherContext(state);
  }

  /**
   * Get weather forecast (placeholder)
   */
  async getWeatherForecast(location: string, days: number): Promise<any[]> {
    // Mock forecast data
    const forecast = [];
    for (let i = 0; i < days; i++) {
      forecast.push({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 15 + Math.random() * 25,
        precipitation: Math.random() * 15,
        windSpeed: Math.random() * 25
      });
    }
    return forecast;
  }

  /**
   * Get weather context for a specific state
   */
  async getWeatherContext(state: string): Promise<WeatherContext> {
    const cacheKey = `state_${state.toUpperCase()}`

    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data
    }

    // Fetch fresh data
    const context = await this.fetchWeatherData(state)

    // Cache the result
    this.cache.set(cacheKey, { data: context, timestamp: Date.now() })

    return context
  }

  /**
   * Get weather context for coordinates
   */
  async getWeatherContextByCoords(lat: number, lon: number): Promise<WeatherContext> {
    const cacheKey = `coords_${lat}_${lon}`

    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data
    }

    const context = await this.fetchWeatherDataByCoords(lat, lon)
    this.cache.set(cacheKey, { data: context, timestamp: Date.now() })

    return context
  }

  /**
   * Fetch weather data from external API (mock implementation)
   * In production, this would call a real weather API like NOAA, Weather Underground, etc.
   */
  private async fetchWeatherData(state: string): Promise<WeatherContext> {
    // Mock weather data based on state
    // In production, this would make actual API calls
    const mockEvents = this.generateMockEvents(state)

    const riskScore = mockEvents.reduce((sum, event) => sum + event.severity, 0) / Math.max(mockEvents.length, 1)
    const advisoryLevel = riskScore > 70 ? 'emergency' : riskScore > 40 ? 'elevated' : 'normal'

    const context: WeatherContext = {
      location: {
        state: state.toUpperCase()
      },
      active_events: mockEvents,
      risk_score: Math.min(100, riskScore),
      advisory_level: advisoryLevel
    }

    return context
  }

  private async fetchWeatherDataByCoords(lat: number, lon: number): Promise<WeatherContext> {
    // Reverse geocode to get state (mock)
    const state = this.coordsToState(lat, lon)
    return this.fetchWeatherData(state)
  }

  /**
   * Generate mock weather events for demonstration
   * In production, this would parse real weather API data
   */
  private generateMockEvents(state: string): WeatherContext['active_events'] {
    const events: WeatherContext['active_events'] = []
    const stateUpper = state.toUpperCase()

    // Gulf Coast states get hurricane potential
    if (['TX', 'LA', 'MS', 'AL', 'FL'].includes(stateUpper)) {
      if (Math.random() > 0.7) {
        events.push({
          type: 'hurricane',
          severity: Math.floor(Math.random() * 40) + 60, // 60-100
          start_time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          expected_duration_hours: Math.floor(Math.random() * 72) + 24
        })
      }
    }

    // Midwest gets severe storms
    if (['IL', 'IN', 'IA', 'MO', 'KS', 'NE'].includes(stateUpper)) {
      if (Math.random() > 0.6) {
        events.push({
          type: 'storm',
          severity: Math.floor(Math.random() * 50) + 30,
          start_time: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString(),
          expected_duration_hours: Math.floor(Math.random() * 24) + 6
        })
      }
    }

    // Mountain West gets wildfires
    if (['CO', 'UT', 'AZ', 'NM', 'WY', 'MT', 'ID'].includes(stateUpper)) {
      if (Math.random() > 0.8) {
        events.push({
          type: 'wildfire',
          severity: Math.floor(Math.random() * 60) + 40,
          start_time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          expected_duration_hours: Math.floor(Math.random() * 168) + 24 // Up to a week
        })
      }
    }

    // Plains get tornado potential
    if (['OK', 'KS', 'NE', 'SD', 'ND'].includes(stateUpper)) {
      if (Math.random() > 0.75) {
        events.push({
          type: 'tornado',
          severity: Math.floor(Math.random() * 70) + 30,
          start_time: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString(),
          expected_duration_hours: Math.floor(Math.random() * 12) + 1
        })
      }
    }

    // Winter events for northern states
    if (['MN', 'WI', 'MI', 'NY', 'VT', 'NH', 'ME', 'MA', 'CT', 'RI', 'NJ', 'PA'].includes(stateUpper)) {
      if (Math.random() > 0.7) {
        events.push({
          type: 'winter',
          severity: Math.floor(Math.random() * 40) + 20,
          start_time: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString(),
          expected_duration_hours: Math.floor(Math.random() * 96) + 12
        })
      }
    }

    return events
  }

  /**
   * Convert coordinates to state (mock implementation)
   */
  private coordsToState(lat: number, lon: number): string {
    // Simple bounding box approximation
    if (lat > 40 && lon < -100) return 'MT'
    if (lat > 35 && lon < -110) return 'AZ'
    if (lat > 30 && lon < -95) return 'TX'
    if (lat > 25 && lon < -80) return 'FL'
    if (lat > 40 && lon > -75) return 'NY'
    if (lat > 35 && lon > -85) return 'TN'
    return 'CA' // Default
  }

  /**
   * Clear cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear()
  }
}

// Export singleton instance
export const weatherProvider = new WeatherProvider()
