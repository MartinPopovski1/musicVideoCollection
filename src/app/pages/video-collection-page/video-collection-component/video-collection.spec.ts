/*
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {  VideoCollectionComponent } from './city-list.component';
import { VideoService } from '../../../shared/services/index';
import { ICity } from '../../../shared/models/index';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

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

describe('CityListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        VideoCollectionComponent
      ],
      providers : [
        VideoService
      ]
    }).compileComponents();
  }));

  it('should create CityList component', () => {
    const fixture = TestBed.createComponent(VideoCollectionComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(VideoCollectionComponent);
    const component = fixture.debugElement.componentInstance;
    let spy_initData = spyOn(component,"initData").and.returnValue([]);
    component.ngOnInit();
    expect(component.cities).toEqual([]);
  })

  it('should call initData and get array as response', fakeAsync(() => {
    const fixture = TestBed.createComponent(VideoCollectionComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(VideoService);
    let spy_cities = spyOn(service,"getCitiesInfo").and.callFake(() => {
      return Rx.of(expectedCitiesInfo).pipe(delay(2000));
    });
    component.initData();
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(true);
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(false);
    expect(component.cities).toEqual(expectedCitiesInfo);
  }))

});
*/
