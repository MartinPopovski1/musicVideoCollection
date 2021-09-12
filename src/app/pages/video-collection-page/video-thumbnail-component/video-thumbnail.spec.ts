/*
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VideoThumbnailComponent } from './city-thumbnail.component';
import { VideoService } from '../../../shared/services/index';
import { ICity } from '../../../shared/models/index';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

const expectedCityInfo: ICity =
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
  }

describe('CityThumbnailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        VideoThumbnailComponent
      ],
      providers : [
        VideoService
      ]
    }).compileComponents();
  }));

  it('should create CityThumbnail component', () => {
    const fixture = TestBed.createComponent(VideoThumbnailComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should have city @input property defined', (() => {
    const fixture = TestBed.createComponent(VideoThumbnailComponent);
    const component = fixture.debugElement.componentInstance;
    component.city = expectedCityInfo;
    fixture.detectChanges()
    expect(component.city).toBe(expectedCityInfo)
  }))

  it('#getTheImageForTheCity returns the correct css class (string) that contains the image of the city', () => {
    const fixture = TestBed.createComponent(VideoThumbnailComponent);
    const component = fixture.debugElement.componentInstance;
    component.city = expectedCityInfo;
    const cityCssClass = component.getTheImageForTheCity();
    const cityName = expectedCityInfo.name && expectedCityInfo.name.toLowerCase()
    expect(cityCssClass[0]).toContain(cityName)
  });

});
*/
