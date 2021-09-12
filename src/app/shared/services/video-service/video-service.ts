import { Injectable } from '@angular/core'
import { Observable, of, forkJoin, Subject } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { ICity } from '../../models/index'
import { CityEnum, CityCoordinates } from '../../enums/city.enum'

@Injectable()
export class VideoService {

  apiURL = 'https://api.openweathermap.org/data/2.5/onecall'
  appId = '4faa1a8c944927d5e56470e813ceb1f7'
  cityList: ICity[] | undefined;

  constructor(private http: HttpClient ) {}

  getCitiesInfo():Observable<any> {
    if(this.cityList) {
      let subject = new Subject()
      setTimeout(() => {subject.next(this.cityList);subject.complete()}, 0)
      return subject;
    }
    else {
       return this.getAllCities()
         .pipe(
           map((citiesData) => {
           this.cityList = citiesData.map((cityData: any, index: number) => this.mapCity(cityData, index))
           return this.cityList}),
           );
    }
  }

  getCityInfo(id:number):Observable<any> {
    if(!this.cityList || !this.cityList.length) {
      return this.getCitiesInfo()
        .pipe(map((citiesData) => {
            return citiesData.find((city: { id: number }) => city.id === id)
          }))
    }
    else {
      let subject = new Subject()
      setTimeout(() => {
        let city = this.cityList && this.cityList.find((city: { id: number }) => city.id === id)
        subject.next(city); subject.complete()}, 0)
      return subject;
    }
  }

  getAllCities():Observable<any> {
    let amsterdamRequest = this.http
      .get(this.getCityUrl(CityCoordinates.Amsterdam.latitude, CityCoordinates.Amsterdam.longitude));
    let berlinRequest = this.http
      .get(this.getCityUrl(CityCoordinates.Berlin.latitude, CityCoordinates.Berlin.longitude));
    let milanRequest = this.http
      .get(this.getCityUrl(CityCoordinates.Milan.latitude, CityCoordinates.Milan.longitude));
    let romeRequest = this.http
      .get(this.getCityUrl(CityCoordinates.Rome.latitude, CityCoordinates.Rome.longitude));
    let parisRequest = this.http
      .get(this.getCityUrl(CityCoordinates.Paris.latitude, CityCoordinates.Paris.longitude));

    return forkJoin([amsterdamRequest, berlinRequest, milanRequest, romeRequest, parisRequest])
      .pipe(
        catchError(this.handleError<any>('getAllCities', {}))
      );
  }

  mapCity(cityRequestData: any, cityEnumCode: number) : ICity {
    if(!cityRequestData) {
      throw({message: "No response"});
    }
    let theNextFiveHours = cityRequestData.hourly && cityRequestData.hourly.slice(1, 6) || [];
    return {
      id: cityEnumCode,
      name: CityEnum[cityEnumCode],
      currentTemperature: cityRequestData.current ? cityRequestData.current.temp : 0,
      currentWind: cityRequestData.current ? this.metersPerSecToKilometersPerHour(cityRequestData.current.wind_speed) : 0,
      forecastForNextHours: theNextFiveHours ? theNextFiveHours.map((cityForecast: any) => this.mapForecastForNextHours(cityForecast)) : [],
    }
  }

  mapForecastForNextHours(forecastInfo: any) : object {
    return {
      time: forecastInfo.dt ? this.convertFromUnixToDate(forecastInfo.dt) : null,
      temperature: forecastInfo.temp ? forecastInfo.temp : 0,
      wind: forecastInfo.wind_speed ? this.metersPerSecToKilometersPerHour(forecastInfo.wind_speed) : 0,
    }
  }

  convertFromUnixToDate(unixTimestamp : number) {
    const milliseconds = unixTimestamp * 1000 //
    return new Date(milliseconds)
  }
  metersPerSecToKilometersPerHour(metersPerSecond: number):number {
    return metersPerSecond * 3.6;
  }
  getCityUrl(cityLatitude:number, cityLongitude:number) : string {
    return this.apiURL +
      `?lat=${cityLatitude}&lon=${cityLongitude}&exclude={minutely,daily,alerts}&appId=${this.appId}&units=metric`;
  }
  handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      alert('Data loading error: ' + error.statusText)
      throw error
    }
  }
}


