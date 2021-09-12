import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VideoThumbnailComponent } from './video-thumbnail.component';
import { IVideo } from '../../../shared/models';


const expectedVideoInfo: IVideo =
  {
    id: 501437,
    artist: "Pants Velour",
    title: "All In",
    releaseYear: 2014,
    genreId: 14,
    imageUrl: "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg"
  }

describe('VideoThumbnailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        VideoThumbnailComponent
      ],
      providers : []
    }).compileComponents();
  }));

  it('should create VideoThumbnail component', () => {
    const fixture = TestBed.createComponent(VideoThumbnailComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should have city @input property defined', (() => {
    const fixture = TestBed.createComponent(VideoThumbnailComponent);
    const component = fixture.debugElement.componentInstance;
    component.video = expectedVideoInfo;
    fixture.detectChanges()
    expect(component.video).toBe(expectedVideoInfo)
  }))


});
