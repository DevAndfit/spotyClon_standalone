import { Injectable, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';

import * as dataRaw from '../../../data/tracks.json'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService implements OnInit{

  private readonly URL = environment.api

  constructor( private http:HttpClient ) {}

  private skypById( listTrack:TrackModel[], id:number ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTrack.filter( track => track._id !== id )
      resolve(listTmp)
    })
  };


  ngOnInit(): void {

  }

    getAllTracks$(): Observable<TrackModel[]> {
      const url = `${this.URL}/tracks`
      return this.http.get<TrackModel[]>(`${url}`)
        .pipe(
          map(( { data }:any ) => {
            return data
          }),

        )
    }

    getAllRandoms$(): Observable<TrackModel[]> {
      const url = `${this.URL}/tracks`
      return this.http.get<TrackModel[]>(`${url}`)
        .pipe(
          mergeMap(( { data }:any ) => this.skypById(data, 1)),
          // map(( reverseData ) => {
          //   return reverseData.filter( (track:TrackModel) => track._id !== 1 )
          // }),
          // tap( data => console.log(data) ),
          catchError((err) => {
            console.log('algo paso revisa', err);
            return of([])
          })
          )
        }


    // const { data }:any = (dataRaw as any).default
    // this.dataTracksTrending$ = of(data)

    // this.dataTracksRandom$ = new Observable((observer) => {

    //   const trackExample: TrackModel = {
    //     _id:9,
    //     name:'leve',
    //     album:'leve',
    //     url:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    //     cover:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    //   }

    //   observer.next()
    // })


}
