import { Component, OnInit } from '@angular/core'
import { VideoService } from '../../../shared/services'
import { IVideo, IGenre } from "../../../shared/models";

@Component({
  selector: 'music-collection',
  template: `
    <div class="video-collection-page-wrapper" [ngClass]="{'video-collection-black-wrapper': isDarkMode}">
      <div class="video-collection-content-wrapper" *ngIf="videos && videos.length">
        <div class="video-collection-header-wrapper">
          <div class="video-collection-title-wrapper"> Music Video Collection </div>
          <div class="video-collection-switch-wrapper">
            <label class="switch">
              <input type="checkbox" [(ngModel)]="isDarkMode"  >
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="video-collection-genre-filter-wrapper">
          <ng-select
            [items]="genres"
            bindLabel="name"
            placeholder="Select your favorite genres"
            [multiple]="true"
            [(ngModel)]="selectedGenres">
          </ng-select>
        </div>
        <div class="video-collection-filters-wrapper">
          <div class="video-collection-search-wrapper">
            <input [(ngModel)]="searchedText" placeholder="Search song or artist" type="text">
          </div>
          <div class="video-collection-year-filter-wrapper">
            <ng-select
              [items]="availableYears"
              bindLabel="name"
              placeholder="Select year"
              [multiple]="false"
              [(ngModel)]="selectedYear">
            </ng-select>
          </div>
        </div>
        <div class="video-thumbnail-list-wrapper">
          <video-thumbnail *ngFor="let video of (videos | filter:searchedText: selectedGenres: selectedYear)"
                           [video]="video">
          </video-thumbnail>
        </div>
      </div>

      <div *ngIf="showLoadingIndicator" class=" col-lg-12 video-list-loading-wrapper">
        <div>LOADING</div>
      </div>
      <div *ngIf="(!videos || !videos.length) && !showLoadingIndicator"
           class=" col-lg-12 video-list-loading-wrapper">
        <div>Data Loading Error</div>
      </div>
    </div>

  `,
  styleUrls: ['./video-collection-component.css']
})

export class VideoCollectionComponent implements OnInit  {
  showLoadingIndicator:boolean;
  isDarkMode:boolean;
  selectedYear:any;
  searchedText:string;
  selectedGenres:any[] = [];
  videos:IVideo[];
  genres:IGenre[];
  availableYears:any[];

  constructor(private videoService:VideoService) {
    this.showLoadingIndicator = false;
    this.isDarkMode = false;
    this.searchedText = '';
    this.selectedYear = null;
    this.videos = []
    this.genres = []
    this.availableYears = []
  }

  ngOnInit() {
    this.initData()
  }

  initData() {
    this.showLoadingIndicator = true;
    this.videoService.getMappedVideosAndGenres().subscribe((videosAndGenres: any) => {
      if(videosAndGenres && videosAndGenres.videos && videosAndGenres.genres) {
        this.videos = videosAndGenres.videos;
        this.genres = videosAndGenres.genres;
        this.getAllReleaseYearsFromVideos(this.videos)
      }
        this.showLoadingIndicator = false;
      },
      error => {
        console.log(error);
        this.showLoadingIndicator = false;
      })
  }

  getAllReleaseYearsFromVideos(videos: any[]) {
    this.availableYears = videos.reduce((acc, video) => {
      let isAlreadyInAvailableYears = acc.find((year: any) => year === video.releaseYear)
      if(!isAlreadyInAvailableYears) return [...acc, video.releaseYear];
      else return acc;
    }, [])
  }
}
