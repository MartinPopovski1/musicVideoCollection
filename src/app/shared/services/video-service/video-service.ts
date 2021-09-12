import { Injectable } from '@angular/core'
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { IVideo, IGenre } from '../../models'

@Injectable()
export class VideoService {

  apiURL = 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json'

  constructor(private http: HttpClient ) {}

  getMappedVideosAndGenres():Observable<any> {
    return this.getAllMusicVideosAndGenres()
      .pipe(map((videosResponseData) => {
        return this.mapResponseData(videosResponseData)
      }))
  }


  getAllMusicVideosAndGenres():Observable<any> {
    return this.http
      .get(this.apiURL)
      .pipe(catchError(this.handleError<any>('getAllMusicVideosAndGenres', {})));
  }

  mapResponseData(videosResponseData: { genres: any[]; videos: any[] }) {
    return {
      genres: videosResponseData.genres ? videosResponseData.genres.map((genre: any) => this.mapGenre(genre)) : [],
      videos: videosResponseData.videos ? videosResponseData.videos.map((video: any) => this.mapVideo(video)) : []
    }
  }

  mapVideo(videosRequestData: any) : IVideo {
    if(!videosRequestData) throw({message: "No response"});
    return {
      id: videosRequestData.id,
      title: videosRequestData.title && videosRequestData.title.toString(),
      artist: videosRequestData.artist && videosRequestData.artist.toString(),
      releaseYear: videosRequestData.release_year,
      genreId: videosRequestData.genre_id,
      imageUrl: videosRequestData.image_url
    }
  }

  mapGenre(genresRequestData: any) : IGenre {
    if(!genresRequestData) throw({message: "No response"});
    return {
      id: genresRequestData.id,
      name: genresRequestData.name,
    }
  }


  handleError<T> (operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      alert('Data loading error: ' + error.statusText)
      throw error
    }
  }
}


