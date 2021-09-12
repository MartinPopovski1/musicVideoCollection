import { VideoService } from './video-service'
import { of, defer } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http';

describe('VideoService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let videoService: VideoService;
  const expectedDataResponse: any = {
    "genres": [
      { "id": 5, "name": "Pop" },
      { "id": 6, "name": "Electronic/Dance" },
      { "id": 8, "name": "Rock" },
    ],
    "videos": [
      {
        "id": 501437,
        "artist": "Pants Velour",
        "title": "All In",
        "release_year": 2014,
        "genre_id": 14,
        "image_url": "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg"
      },
      {
        "id": 501649,
        "artist": "El Koala",
        "title": "Veni paca to",
        "release_year": 2014,
        "genre_id": 8,
        "image_url": "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501649/images/app/w522_h292.jpg"
      }]
  }


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    videoService = new VideoService(httpClientSpy as any);
  });


  it('#getAllMusicVideosAndGenres should return expected response data (HttpClient called 1 time)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedDataResponse));

    videoService.getAllMusicVideosAndGenres().subscribe(
      dataResponse => {
        expect(dataResponse && dataResponse.videos && dataResponse.genres).toBeDefined();
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one http call');
  });

  it('#getAllMusicVideosAndGenres should return an error with status (number) when the server returns an error with status (number)', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Server Down'
    });

    httpClientSpy.get.and.returnValue(responseError(errorResponse));

    videoService.getAllMusicVideosAndGenres().subscribe(
      dataResponse => {
        return done.fail('expected an error, not response')
      },
      error => {
        expect(error.status).toBe(errorResponse.status);
        done();
      }
    );
  })


  it('#getMappedVideosAndGenres given the expected responseData should return object that have videos and genres mapped arrays',
    (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(responseData(expectedDataResponse));
      videoService.getMappedVideosAndGenres().subscribe(dataResponse => {
        expect(dataResponse && dataResponse.videos && dataResponse.genres).toBeDefined();
        expect(dataResponse.videos[0].id && dataResponse.videos[0].title && dataResponse.videos[0].artist).toBeDefined();
        expect(dataResponse.videos[0].releaseYear && dataResponse.videos[0].genreId && dataResponse.videos[0].imageUrl).toBeDefined();
        expect(dataResponse.genres[0].id && dataResponse.genres[0].name).toBeDefined();
        done();
      });
    });


  it('#mapVideo given the expected response data should return mapped video', () => {
    const CityEnumKey = 0;
    const mappedVideoInfo = videoService.mapVideo(expectedDataResponse.videos[0])
    expect(mappedVideoInfo.id && mappedVideoInfo.title && mappedVideoInfo.artist).toBeDefined();
    expect(mappedVideoInfo.releaseYear && mappedVideoInfo.genreId && mappedVideoInfo.imageUrl).toBeDefined();
  });
  it('#mapGenre given the expected response data should return mapped genre', () => {
    const mappedGenreInfo = videoService.mapGenre(expectedDataResponse.genres[0])
    expect(mappedGenreInfo.id && mappedGenreInfo.name).toBeDefined();
  });

  it('#handleError should throw error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Server Down'
    });
    expect(videoService.handleError('testing error func', errorResponse)).toThrowError();
  });




  // helper functions
  function responseError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }
  function responseData<T>(dataObject: any) {
    return defer(() => Promise.resolve(dataObject));
  }
})
