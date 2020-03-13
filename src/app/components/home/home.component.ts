import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "../../services/youtube.service";
declare var $: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: []
})
export class HomeComponent implements OnInit {
  public nextPageToken: string;
  videos: any[] = [];

  videoSel: any;
  constructor(public _service: YoutubeService) {
    this.cargarVideos();
  }

  cargarMas() {
    this.cargarVideos();
  }
  cargarVideos() {
    this._service.getVideos().subscribe((res: any) => {
      if (this.nextPageToken) {
        let vid2: any[] = [];
        for (const video of res.items) {
          let snippet = video.snippet;
          vid2.push(snippet);
        }
        this.videos.push.apply(this.videos, vid2);
        return vid2;
      }
      this.nextPageToken = res.nextPageToken;
      this._service.nextPageToken = this.nextPageToken;
      let vid: any[] = [];
      for (const video of res.items) {
        let snippet = video.snippet;
        vid.push(snippet);
      }
      this.videos = vid;

      return vid;
    });
  }
  verVideo(video: any) {
    this.videoSel = video;

    $("#myModal").modal();
  }

  cerrarModal() {
    this.videoSel = null;

    $("#myModal").modal("hide");
  }

  ngOnInit(): void {}
}
