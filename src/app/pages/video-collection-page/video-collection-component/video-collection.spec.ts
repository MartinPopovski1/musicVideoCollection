import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VideoCollectionComponent } from './video-collection-component';
import { VideoService } from '../../../shared/services';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

const expectedMappedDataResponse: any = {
  genres: [
    { id: 5, name: "Pop" },
    { id: 6, name: "Electronic/Dance" },
    { id: 8, name: "Rock" },
  ],
  videos: [
    {
      id: 501437,
      artist: "Pants Velour",
      title: "All In",
      release_year: 2014,
      genre_id: 14,
      image_url: "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg"
    },
    {
      id: 501649,
      artist: "El Koala",
      title: "Veni paca to",
      release_year: 2014,
      genre_id: 8,
      image_url: "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501649/images/app/w522_h292.jpg"
    }]
}

describe('VideoCollectionComponent', () => {
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
    expect(component.videos).toEqual([]);
    expect(component.genres).toEqual([]);
    expect(component.availableYears).toEqual([]);
  })

  it('#initData should call getMappedVideosAndGenres should get object with mapped arrays of genres and videos', fakeAsync(() => {
    const fixture = TestBed.createComponent(VideoCollectionComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(VideoService);
    let spy_cities = spyOn(service,"getMappedVideosAndGenres").and.callFake(() => {
      return Rx.of(expectedMappedDataResponse).pipe(delay(2000));
    });
    component.initData();
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(true);
    tick(1000);
    expect(component.showLoadingIndicator).toEqual(false);
    expect(component.videos).toEqual(expectedMappedDataResponse.videos);
    expect(component.genres).toEqual(expectedMappedDataResponse.genres);
  }))

  it('#getAllReleaseYearsFromVideos given the videos mapped data should return array with all release years that can be found in the data ', () => {
    const fixture = TestBed.createComponent(VideoCollectionComponent);
    const component = fixture.debugElement.componentInstance;
    const allReleaseYears = component.getAllReleaseYearsFromVideos(expectedMappedDataResponse.videos)
    expect(allReleaseYears && allReleaseYears.length).toBeDefined();
  });

});
