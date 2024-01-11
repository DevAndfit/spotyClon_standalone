import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService implements OnInit{

  callback:EventEmitter<any> = new EventEmitter<any>();

  public audio!:HTMLAudioElement
  public trackInfo$:BehaviorSubject<TrackModel|undefined> = new BehaviorSubject<TrackModel|undefined>(undefined);
  public timeElapsed$:BehaviorSubject<string> = new BehaviorSubject<string>('00:00');
  public timeRemaining$:BehaviorSubject<string> = new BehaviorSubject<string>('-00:00');
  public playerStatus$:BehaviorSubject<string> = new BehaviorSubject<string>('paused');
  public playerPercentage$:BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor(  ) {

    this.audio = new Audio()
    this.trackInfo$.subscribe( respOk => {
      if (respOk) {
        this.setAudio(respOk)
      }
    });

    this.listenAllEvents();

  }

  ngOnInit(): void {

  }

  public setAudio( track:TrackModel ):void {
    console.log('Desde servicio', track);
    this.audio.src = track.url
    this.audio.play()
  }

  private listenAllEvents():void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false )
    this.audio.addEventListener('playing', this.setPlayerStatus, false )
    this.audio.addEventListener('play', this.setPlayerStatus, false )
    this.audio.addEventListener('pause', this.setPlayerStatus, false )
    this.audio.addEventListener('ended', this.setPlayerStatus, false )
  }

  //TODO: Arrow functions ------------- start -----------------------
  private calculateTime = () => {
    // console.log('Disparando evento');
    const { duration, currentTime } = this.audio
    // console.log( [ duration, currentTime ] );
    this.setTimeElapsed( currentTime )
    this.setTimeRemaining( currentTime, duration )
    this.setPercentage( currentTime, duration )

  }

  private setPlayerStatus = ( state:any ) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;
    }
  };

  //TODO: Arrow functions ------------- end -----------------------

  private setTimeElapsed( currentTime:number ):void {
    let seconds = Math.floor( currentTime % 60 );
    let minutes = Math.floor( (currentTime / 60 ) % 60 );

    const displaySecond = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinute = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinute}:${displaySecond}`
    this.timeElapsed$.next( displayFormat )
  };

  private setTimeRemaining( currentTime:number, duration:number  ):void {

    //todo asi es para el calculo inverso del tiempo restante
    // let timeLeft = duration - currentTime;

    let timeLeft = duration;

    let seconds = Math.floor( timeLeft % 60 );
    let minutes = Math.floor( (timeLeft / 60 ) % 60 );

    const displaySecond = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinute = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinute}:${displaySecond}`
    this.timeRemaining$.next( displayFormat )

  };

  public togglePlayer():void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  };

  setPercentage( currentTime:number, duration:number ):void {
    let percentage = (currentTime * 100) / duration
    this.playerPercentage$.next( percentage )
  };

  public seekAudio(percetage: number):void {
    const { duration } = this.audio
    const percetageToSecond = (percetage * duration) / 100
    this.audio.currentTime = percetageToSecond
  };
}
