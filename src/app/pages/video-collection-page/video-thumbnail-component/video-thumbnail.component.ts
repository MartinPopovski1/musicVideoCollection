import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'video-thumbnail',
  template: `
    <div class="thumbnail-wrapper">
      <div class="thumbnail-image-wrapper">
        <img src="../../../../assets/rome.png" draggable="false" alt="Image not found"/>
      </div>
      <div class="thumbnail-info-wrapper">
        <div class="thumbnail-artist-info-wrapper">
          {{ video.artist }}
        </div>
        <div class="thumbnail-song-info-wrapper">
          {{ video.title }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./video-thumbnail-component.css']
})

export class VideoThumbnailComponent implements OnInit {
  @Input() video: any;

  constructor() {}

  ngOnInit() {
    console.log(this.video)
  }

}
