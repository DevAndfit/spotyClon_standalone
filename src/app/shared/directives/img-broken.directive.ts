import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError():void {
    const elNative = this.elHost.nativeElement;
    elNative.src = 'https://img.freepik.com/vector-premium/estudiar-casa-ilustracion-fondo_188398-294.jpg?w=1480';

  }

  constructor( private elHost: ElementRef) {
   }





}
