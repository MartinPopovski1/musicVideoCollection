import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VideoCollectionComponent } from './pages/video-collection-page/video-collection-component/video-collection-component';
import {VideoThumbnailComponent} from "./pages/video-collection-page/video-thumbnail-component/video-thumbnail.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import {FilterPipe} from "./pages/video-collection-page/video-collection-component/custom-pipe-for-videos";
import {VideoService} from "./shared/services";

@NgModule({
  declarations: [
    AppComponent,
    VideoCollectionComponent,
    VideoThumbnailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
