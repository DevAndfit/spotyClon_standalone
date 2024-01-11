import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() callbackData:EventEmitter<any> = new EventEmitter();

  src:string = ''


  callSearch( term:string ):void {

    if( term.length >= 3){
      this.callbackData.emit( term );
    }


  }


}
