import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchBarService } from '@module/history/services/search-bar.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent {

  resultList$:Observable<any> = of([])

  constructor( private searchBarService: SearchBarService ){}

  receiveData( event:string ):void {
    console.log('Desde padre', event );
    this.resultList$ = this.searchBarService.searchTracks$( event )


  }
}
