import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform( value: Array<any>, args:string | null = null, sort:string ): Array<any> {

    try {

      if( args === null ){
        return value
      }else {
        const tempList = value.sort((a, b) => {
          if (a[args] < b[args]) {
            return -1;
          }else if( a[args] === b[args] ) {
            return 0;
          }
          if (a[args] > b[args]) {
            return 1;
          }
          return 1;

        });

        return ( sort === 'asc' ) ? tempList : tempList.reverse();
      }

    } catch (error) {
      console.log('algo paso!');
      return value
    }

  }

}
