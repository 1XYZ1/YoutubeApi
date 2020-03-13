import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { pipe, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  private youtubeUrl: string = "https://www.googleapis.com/youtube/v3";
  private apiKey: string = "AIzaSyAZgA0bB0QhJ7n-X3YI9s5o1jgqQqAntCA";
  private playlistId: string = "UUPPS0RvtIq8E9nTSRgbbNbw";
  public nextPageToken: string;
  items: any;
  constructor(public http: HttpClient) {}

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;

    let params = new HttpParams()
      .append("part", "snippet")
      .append("maxResults", "9")
      .append("playlistId", this.playlistId)
      .append("key", this.apiKey);

    let params2 = new HttpParams()
      .append("part", "snippet")
      .append("maxResults", "9")
      .append("playlistId", this.playlistId)
      .append("key", this.apiKey)
      .append("pageToken", this.nextPageToken);

    if (this.nextPageToken) {
      return this.http.get(url, { params: params2 });
    } else {
      return this.http.get(url, { params: params });
    }
  }
}
