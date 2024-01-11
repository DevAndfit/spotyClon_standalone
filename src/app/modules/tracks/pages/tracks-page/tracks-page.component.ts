import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription, lastValueFrom } from 'rxjs';
import { TrackService } from '@module/tracks/services/track.service';

// import * as dataRaw from '../../../../data/tracks.json'

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  dataTracks: Array<TrackModel> = []
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []


  constructor( private trackService:TrackService ){}

  ngOnInit(): void {
    this.getAllData();
    this.getAllRandoms();
  }

  async getAllData():Promise<any>{
    this.tracksTrending = await lastValueFrom(this.trackService.getAllTracks$())
  };

  getAllRandoms(): void {
    this.trackService.getAllRandoms$()
    .subscribe(( response:TrackModel[] ) => {
      this.tracksRandom = response
    })
  };

  ngOnDestroy(): void {}

}
