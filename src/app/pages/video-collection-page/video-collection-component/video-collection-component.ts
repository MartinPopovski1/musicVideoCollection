import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'music-collection',
  template: `
    <div class="video-collection-page-wrapper" [ngClass]="{'video-collection-black-wrapper': isDarkMode}">
      <div class="video-collection-content-wrapper">
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
          <video-thumbnail *ngFor="let video of (videos | filter:searchedText: selectedGenres: selectedYear)" [video]="video">
          </video-thumbnail>
<!--          <div *ngIf="(videos | filter:searchedText).length <1">
            Not Found
          </div>-->
        </div>

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

  videos:any[] = [
    { genreId: 1, artist: "BMW Hyundai", title: "Song of hope", releaseYear: 1990 },
    { genreId: 5, artist: "Kia Tata", title: "Fav title", releaseYear: 2020 },
    { genreId: 3, artist: "Volkswagen Ford", title: "Be real", releaseYear: 1990  },
    { genreId: 4, artist: "Renault Audi", title: "Like me", releaseYear: 2001  },
    { genreId: 5, artist: "Mercedes Benz Skoda", title: "No skoda", releaseYear: 1990  },
  ];

  genres:any[] = [
    { "id": 5, "name": "Pop" },
    { "id": 4, "name": "Electronic/Dance" },
    { "id": 3, "name": "Rock" },
    { "id": 2, "name": "Country" },
  ];

  availableYears:any[];



  constructor() {
    this.showLoadingIndicator = false;
    this.isDarkMode = false;
    this.searchedText = '';
    this.selectedYear = null;
    this.availableYears = [
      1990, 2001, 2020
    ];
  }


  ngOnInit() {
    this.initData()
  }

  initData() {
    this.showLoadingIndicator = true;

    /* this.availableYears = this.videos.reduce((video, acc) => {
     let isAlreadyInAvailableYears = this.availableYears.find(year => year === video.releaseYear)
       if(!isAlreadyInAvailableYears) return video.releaseYear;
       else return acc;
      }) */

  }
}
