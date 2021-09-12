export interface ICity {
  id: number
  name: string
  currentTemperature: number
  currentWind: number
  forecastForNextHours: IForecastForNextHours[]
}
interface IForecastForNextHours {
  time: any,
  temperature: number,
  wind: number
}
