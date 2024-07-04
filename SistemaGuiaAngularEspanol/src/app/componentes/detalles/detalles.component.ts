// detalles.component.ts
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CasaService } from '../../servicios/casa.service';
import { CommonModule } from '@angular/common';
import { casa } from '../../entidades/casa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  oservice = inject(CasaService);
  clocalizacion: casa | undefined;
  currentSlideIndex = 0;
  slideInterval: any;

  constructor() {
    const codigo = parseInt(this.route.snapshot.params['id'], 10);
    this.clocalizacion = this.oservice.getCasaId(codigo);
  }

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia cada 3 segundos
  }

  prevSlide() {
    if (this.clocalizacion && this.clocalizacion.foto.length) {
      this.currentSlideIndex = (this.currentSlideIndex > 0) ? this.currentSlideIndex - 1 : this.clocalizacion.foto.length - 1;
    }
  }

  nextSlide() {
    if (this.clocalizacion && this.clocalizacion.foto.length) {
      this.currentSlideIndex = (this.currentSlideIndex < this.clocalizacion.foto.length - 1) ? this.currentSlideIndex + 1 : 0;
    }
  }
}
