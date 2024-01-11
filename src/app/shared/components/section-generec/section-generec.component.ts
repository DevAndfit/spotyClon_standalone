import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generec',
  templateUrl: './section-generec.component.html',
  styleUrls: ['./section-generec.component.scss']
})
export class SectionGenerecComponent {

  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'big'
  @Input() dataTracks: Array<TrackModel> = []

  constructor() { }

  ngOnInit(): void {

  }


}
