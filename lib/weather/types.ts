export type DisasterType =
  | "hurricane"
  | "storm"
  | "flood"
  | "wildfire"
  | "tornado"
  | "hail"
  | "winter"
  | "heat"

export type WeatherEvent = {
  type: DisasterType
  severity: number // 0–100
  start_time: string
  expected_duration_hours?: number
}

export type WeatherContext = {
  location: {
    state: string
    county?: string
    lat?: number
    lon?: number
  }
  active_events: WeatherEvent[]
  risk_score: number
  advisory_level: "normal" | "elevated" | "emergency"
}