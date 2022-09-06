import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  @Input() images: string[];

  slideIndex: number = 0;

  changeSlide(n: number) {
    this.slideIndex += n;
  }
}
