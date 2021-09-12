import {Component, Input} from '@angular/core'
import { IVideo} from "../../../shared/models";

@Component({
  selector: 'video-thumbnail',
  template: `
    <div class="thumbnail-wrapper">
      <div class="thumbnail-image-wrapper">
        <img [src]="video && video.imageUrl" draggable="false" alt="Image not found"/>
      </div>
      <div class="thumbnail-info-wrapper">
        <div class="thumbnail-artist-info-wrapper">
          {{ video && video.artist }}
        </div>
        <div class="thumbnail-song-info-wrapper">
          {{ video && video.title }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./video-thumbnail-component.css']
})

export class VideoThumbnailComponent {
  @Input() video: IVideo | undefined;

  constructor() {}

}
