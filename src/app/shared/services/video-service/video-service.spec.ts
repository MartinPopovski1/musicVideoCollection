import { VideoService } from './city-service'
import { ICity } from '../../models/index'
import { CityCoordinates } from '../../enums/index'
import { Observable, of, defer } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http';

describe('CityService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let cityService: VideoService;
  const expectedCitiesInfo : ICity[] = [
    {
      id: 0,
      name: 'Amsterdam',
      currentTemperature: 12,
      currentWind: 14,
      forecastForNextHours: [
        {
          time: new Date(234256785),
          temperature: 23,
          wind: 12
        }
      ],
    },
    {
      id: 1,
      name: 'Berlin',
      currentTemperature: 12,
      currentWind: 14,
      forecastForNextHours: [
        {
          time: new Date(234256785),
          temperature: 23,
          wind: 12
        }
      ],
    },
    {
      id: 2,
      name: 'Milan',
      currentTemperature: 12,
      currentWind: 14,
      forecastForNextHours: [
        {
          time: new Date(234256785),
          temperature: 23,
          wind: 12
        }
      ],
    },
    {
      id: 3,
      name: 'Rome',
      currentTemperature: 12,
      currentWind: 14,
      forecastForNextHours: [
        {
          time: new Date(234256785),
          temperature: 23,
          wind: 12
        }
      ],
    },
    {
      id: 4,
      name: 'Paris',
      currentTemperature: 12,
      currentWind: 14,
      forecastForNextHours: [
        {
          time: new Date(234256785),
          temperature: 23,
          wind: 12
        }
      ],
    }
  ]
  const expectedCitiesResponse: any =
    {
      current: {dt: 1631280893, temp: 27.2},
      hourly: [{dt: 1631278800, temp: 27.75}],
    }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    cityService = new VideoService(httpClientSpy as any);
  });

  it('#getAllCities should return expected cities (HttpClient called 5 time, once for each city)', (done: DoneFn) => {


    httpClientSpy.get.and.returnValue(of(expectedCitiesResponse));

    cityService.getAllCities().subscribe(
      cities => {
        expect(cities.length && cities[0].current && cities[0].hourly).toBeDefined();
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(5, 'one call for each sity');
  });

  it('#getAllCities should return an error with status (number) when the server returns an error with status (number)', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Server Down'
    });

    httpClientSpy.get.and.returnValue(responseError(errorResponse));

    cityService.getAllCities().subscribe(
      cities => {
        return done.fail('expected an error, not response')
      },
      error => {
        expect(error.status).toBe(errorResponse.status);
        done();
      }
    );
  })

  it('#getCitiesInfo should return array of cityInfo objects',
    (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(expectedCitiesInfo));
      cityService.getCitiesInfo().subscribe(citiesInfo => {
        expect(citiesInfo && citiesInfo.length).toBeDefined();
        expect(citiesInfo[0].currentTemperature && citiesInfo[0].currentWind).toBeDefined();
        expect(citiesInfo[0].forecastForNextHours
          && citiesInfo[0].forecastForNextHours.length).toBeDefined();
        done();
      });
    });

  it('#getCityInfo should return city info object that implements ICity interface from the city list',
    (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(responseData(expectedCitiesInfo[0]));
      cityService.getCityInfo(0).subscribe(citiesInfo => {
        expect(citiesInfo && citiesInfo.name && citiesInfo.currentTemperature).toBeDefined();
        expect(citiesInfo.forecastForNextHours && citiesInfo.forecastForNextHours.length).toBeDefined();
        done();
      });
    });

  it('#mapCity should return mapped city info object that implements ICity interface from city response data', () => {
    const CittyEnumKey = 0;
    const mappedCityInfo = cityService.mapCity(expectedCitiesResponse, CittyEnumKey)
    expect(mappedCityInfo && mappedCityInfo.name && mappedCityInfo.currentTemperature).toBeDefined();
    expect(mappedCityInfo.forecastForNextHours && mappedCityInfo.forecastForNextHours.length).toBeDefined();
  });

  it('#convertFromUnixToDate should return date object', () => {
    const convertedDate = cityService.convertFromUnixToDate(1283762334);
    expect(convertedDate).toBeInstanceOf(Date);
  });
  it('#metersPerSecToKilometersPerHour should return number', () => {
    const convertedNumber = cityService.metersPerSecToKilometersPerHour(14);
    expect(convertedNumber).toBeInstanceOf(Number);
  });
  it('#getCityUrl should return api url that contains query params for longitude, latitude and appId', () => {
    const convertedNumber = cityService.getCityUrl(CityCoordinates.Berlin.latitude, CityCoordinates.Berlin.latitude);
    expect(convertedNumber).toContain('lon=');
    expect(convertedNumber).toContain('lat=');
    expect(convertedNumber).toContain('appId=');
  });

  it('#handleError should throw error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Server Down'
    });
    expect(cityService.handleError('testing error func', errorResponse)).toThrowError();
  });



  // helper functions
  function responseError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }
  function responseData<T>(dataObject: any) {
    return defer(() => Promise.resolve(dataObject));
  }
})
