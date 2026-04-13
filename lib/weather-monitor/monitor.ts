import axios from 'axios';
import { WeatherSignal } from '../weather-trigger/types';

interface OpenWeatherCurrent {
  weather: Array<{
    main: string;
    description: string;
  }>;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

interface OpenWeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

interface OpenWeatherOneCall {
  alerts?: OpenWeatherAlert[];
  current: OpenWeatherCurrent;
  hourly: Array<{
    dt: number;
    weather: Array<{ main: string; description: string }>;
    wind_speed: number;
    rain?: { '1h': number };
    snow?: { '1h': number };
  }>;
}

class WeatherMonitor {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OPENWEATHER_API_KEY not set - weather monitoring will use mock data');
    }
  }

  /**
   * Get current weather for a location
   */
  async getCurrentWeather(lat: number, lon: number, cityName?: string): Promise<WeatherSignal | null> {
    try {
      if (!this.apiKey) {
        // Return mock data for testing
        return this.getMockWeatherSignal(lat, lon, cityName);
      }

      const response = await axios.get<OpenWeatherOneCall>(
        `${this.baseUrl}/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${this.apiKey}&units=imperial`
      );

      const data = response.data;
      const current = data.current;

      // Determine event type and severity
      const eventType = this.determineEventType(current, data.alerts);
      const severity = this.calculateSeverity(current, data.alerts);

      // Check for hail/wind thresholds
      let hailSize: number | undefined;
      let windSpeed: number | undefined;

      if (eventType === 'hail' && data.hourly) {
        // Look for hail in recent hours
        const recentHail = data.hourly.slice(0, 6).find(h =>
          h.weather.some(w => w.main.toLowerCase().includes('hail'))
        );
        if (recentHail) {
          hailSize = this.estimateHailSize(severity);
        }
      }

      if (current.wind.speed > 20) {
        windSpeed = current.wind.speed;
      }

      // Determine advisory level
      const advisory = this.determineAdvisory(data.alerts, severity);

      return {
        event_type: eventType,
        severity,
        hail_size_inches: hailSize,
        wind_speed_mph: windSpeed,
        region: {
          state: this.getStateFromCoords(lat, lon),
          county: cityName,
          lat,
          lon
        },
        advisory,
        timestamp: new Date().toISOString(),
        source: 'OpenWeather'
      };

    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  /**
   * Monitor multiple locations for weather events
   */
  async monitorLocations(locations: Array<{ lat: number; lon: number; city: string; state: string }>): Promise<WeatherSignal[]> {
    const signals: WeatherSignal[] = [];

    for (const location of locations) {
      const signal = await this.getCurrentWeather(location.lat, location.lon, location.city);
      if (signal && signal.severity > 30) { // Only report significant events
        signals.push(signal);
      }
    }

    return signals;
  }

  private determineEventType(current: OpenWeatherCurrent, alerts?: OpenWeatherAlert[]): WeatherSignal['event_type'] {
    // Check alerts first
    if (alerts) {
      for (const alert of alerts) {
        const event = alert.event.toLowerCase();
        if (event.includes('hurricane')) return 'hurricane';
        if (event.includes('tornado')) return 'storm';
        if (event.includes('hail')) return 'hail';
        if (event.includes('flood')) return 'flood';
        if (event.includes('winter') || event.includes('snow')) return 'winter';
        if (event.includes('heat')) return 'heat_wave';
        if (event.includes('cold') || event.includes('freeze')) return 'cold_snap';
      }
    }

    // Check temperature extremes for HVAC events
    const temp = current.main.temp;
    if (temp >= 95) return 'heat_wave'; // Heat wave
    if (temp <= 20) return 'cold_snap'; // Cold snap

    // Check current conditions
    const weather = current.weather[0]?.main.toLowerCase();
    if (weather?.includes('thunderstorm')) return 'storm';
    if (weather?.includes('rain') && current.wind.speed > 30) return 'storm';
    if (current.wind.speed > 50) return 'wind';
    if (current.rain && current.rain['1h'] > 0.5) return 'storm';

    return 'storm'; // Default
  }

  private calculateSeverity(current: OpenWeatherCurrent, alerts?: OpenWeatherAlert[]): number {
    let severity = 0;

    // Temperature-based severity for HVAC events
    const temp = current.main.temp;
    if (temp >= 95) {
      // Heat wave severity
      if (temp >= 105) severity += 50;
      else if (temp >= 100) severity += 40;
      else if (temp >= 95) severity += 30;
    } else if (temp <= 20) {
      // Cold snap severity
      if (temp <= 0) severity += 50;
      else if (temp <= 10) severity += 40;
      else if (temp <= 20) severity += 30;
    }

    // Wind speed
    if (current.wind.speed > 50) severity += 40;
    else if (current.wind.speed > 30) severity += 20;
    else if (current.wind.speed > 20) severity += 10;

    // Precipitation
    if (current.rain?.['1h']) {
      if (current.rain['1h'] > 2) severity += 30;
      else if (current.rain['1h'] > 1) severity += 20;
      else if (current.rain['1h'] > 0.5) severity += 10;
    }

    // Alerts increase severity
    if (alerts && alerts.length > 0) {
      severity += 30;
    }

    return Math.min(severity, 100);
  }

  private estimateHailSize(severity: number): number {
    if (severity > 80) return 2.0;
    if (severity > 60) return 1.5;
    if (severity > 40) return 1.0;
    return 0.75;
  }

  private determineAdvisory(alerts: OpenWeatherAlert[] | undefined, severity: number): WeatherSignal['advisory'] {
    if (alerts && alerts.length > 0) {
      return alerts[0].tags.includes('Extreme') ? 'emergency' : 'warning';
    }

    if (severity > 70) return 'emergency';
    if (severity > 40) return 'warning';
    return 'watch';
  }

  private getStateFromCoords(lat: number, lon: number): string {
    // Simple coordinate to state mapping for target regions
    if (lat >= 30.5 && lat <= 35 && lon >= -85 && lon <= -80) return 'GA';
    if (lat >= 25 && lat <= 31 && lon >= -87 && lon <= -80) return 'FL';
    if (lat >= 33 && lat <= 37 && lon >= -103 && lon <= -94) return 'OK';
    if (lat >= 31 && lat <= 37 && lon >= -114 && lon <= -109) return 'AZ';
    if (lat >= 42 && lat <= 47 && lon >= -92 && lon <= -86) return 'WI';
    return 'Unknown';
  }

  private getMockWeatherSignal(lat: number, lon: number, cityName?: string): WeatherSignal {
    // Mock data for testing when API key is not available
    const mockEvents: WeatherSignal['event_type'][] = ['hail', 'storm', 'wind', 'heat_wave', 'cold_snap'];
    const eventType = mockEvents[Math.floor(Math.random() * mockEvents.length)];

    return {
      event_type: eventType,
      severity: Math.floor(Math.random() * 60) + 20, // 20-80
      hail_size_inches: eventType === 'hail' ? Math.random() * 1.5 + 0.5 : undefined,
      wind_speed_mph: eventType === 'wind' || eventType === 'storm' ? Math.random() * 40 + 10 : undefined,
      region: {
        state: this.getStateFromCoords(lat, lon),
        county: cityName,
        lat,
        lon
      },
      advisory: Math.random() > 0.7 ? 'warning' : 'watch',
      timestamp: new Date().toISOString(),
      source: 'Mock'
    };
  }
}

// Target monitoring locations (major cities in target states)
export const MONITORING_LOCATIONS = [
  { lat: 33.7490, lon: -84.3880, city: 'Atlanta', state: 'GA' },
  { lat: 32.0840, lon: -81.0998, city: 'Savannah', state: 'GA' },
  { lat: 30.3322, lon: -81.6557, city: 'Jacksonville', state: 'FL' },
  { lat: 25.7617, lon: -80.1918, city: 'Miami', state: 'FL' },
  { lat: 28.5383, lon: -81.3792, city: 'Orlando', state: 'FL' },
  { lat: 35.4676, lon: -97.5164, city: 'Oklahoma City', state: 'OK' },
  { lat: 36.1539, lon: -95.9928, city: 'Tulsa', state: 'OK' },
  { lat: 33.4484, lon: -112.0740, city: 'Phoenix', state: 'AZ' },
  { lat: 33.4942, lon: -111.9261, city: 'Mesa', state: 'AZ' },
  { lat: 43.0731, lon: -89.4012, city: 'Madison', state: 'WI' },
  { lat: 43.0389, lon: -87.9065, city: 'Milwaukee', state: 'WI' },
];

export const weatherMonitor = new WeatherMonitor();