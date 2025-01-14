import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardBlogComponent } from '../card-blog/card-blog.component';
import { CardCursoComponent } from '../card-curso/card-curso.component';
import { trigger, transition, style, animate } from '@angular/animations';

export interface CarouselItem {
  type: 'blog' | 'curso';
  data: any;
}

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CardBlogComponent,
    CardCursoComponent
  ],
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class CarrosselComponent implements AfterViewInit {
  @Input() items: CarouselItem[] = [];
  @Input() title: string = '';
  @Input() itemsPerSlide: number = 3;
  @ViewChild('carousel') carousel!: ElementRef;

  currentIndex: number = 0;
  totalSlides: number = 0;
  visibleItems: CarouselItem[] = [];
  touchStartX: number = 0;
  autoplayInterval: any;

  ngAfterViewInit() {
    this.updateVisibleItems();
    this.startAutoplay();
    this.calculateTotalSlides();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  calculateTotalSlides() {
    this.totalSlides = Math.ceil(this.items.length / this.itemsPerSlide);
  }

  updateVisibleItems() {
    const start = this.currentIndex * this.itemsPerSlide;
    this.visibleItems = this.items.slice(start, start + this.itemsPerSlide);
  }

  next() {
    this.stopAutoplay();
    if (this.currentIndex < Math.ceil(this.items.length / this.itemsPerSlide) - 1) {
      this.currentIndex++;
      this.updateVisibleItems();
    }
    this.startAutoplay();
  }

  prev() {
    this.stopAutoplay();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleItems();
    }
    this.startAutoplay();
  }

  // Touch handling for mobile devices
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.stopAutoplay();
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const difference = this.touchStartX - touchEndX;

    if (Math.abs(difference) > 50) { // minimum swipe distance
      if (difference > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
    this.startAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex < Math.ceil(this.items.length / this.itemsPerSlide) - 1) {
        this.next();
      } else {
        this.currentIndex = 0;
        this.updateVisibleItems();
      }
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  // Responsive items per slide
  getItemsPerSlide(): number {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return this.itemsPerSlide;
  }
}
