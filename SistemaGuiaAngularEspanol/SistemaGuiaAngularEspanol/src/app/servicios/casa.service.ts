import { Injectable } from '@angular/core';
import { casa } from '../entidades/casa';

@Injectable({
  providedIn: 'root'
})
export class CasaService {
  private readonly storageKey = 'casas';
  private ListaCasas: casa[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.ListaCasas = JSON.parse(data).map((c: casa) => ({
        ...c,
        foto: Array.isArray(c.foto) ? c.foto : [c.foto]
      }));
    } else {
      this.ListaCasas = this.getDefaultCasas();
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.ListaCasas));
  }

  private getDefaultCasas(): casa[] {
    return [
      {
        id: 0,
        nombre: 'Acme Fresh Start Housing',
        ciudad: 'Salinas',
        provincia: 'Santa elena',
        foto: ['https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg'],
        unidades: 2,
        wifi: true,
        lavanderia: true,
      },
      {
        id: 1,
        nombre: 'A113 Transitional Housing',
        ciudad: 'Guayaquil',
        provincia: 'Guayas',
        foto: ['https://angular.io/assets/images/tutorials/faa/brandon-griggs-wR11KBaB86U-unsplash.jpg'],
        unidades: 3,
        wifi: false,
        lavanderia: true,
      },
      {
        id: 2,
        nombre: 'Warm Beds Housing Support',
        ciudad: 'Salinas',
        provincia: 'Santa elena',
        foto: ['https://angular.io/assets/images/tutorials/faa/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg'],
        unidades: 2,
        wifi: false,
        lavanderia: true,
      },
      {
        id: 3,
        nombre: 'Homesteady Housing',
        ciudad: 'Machala',
        provincia: 'El oro',
        foto: ['https://angular.io/assets/images/tutorials/faa/ian-macdonald-W8z6aiwfi1E-unsplash.jpg'],
        unidades: 1,
        wifi: true,
        lavanderia: false,
      },
      {
        id: 4,
        nombre: 'Happy Homes Group',
        ciudad: 'Manta',
        provincia: 'Manabi',
        foto: ['https://angular.io/assets/images/tutorials/faa/krzysztof-hepner-978RAXoXnH4-unsplash.jpg'],
        unidades: 1,
        wifi: true,
        lavanderia: false,
      },
      {
        id: 5,
        nombre: 'Hopeful Apartment Group',
        ciudad: 'Crucitas',
        provincia: 'Manabi',
        foto: ['https://angular.io/assets/images/tutorials/faa/r-architecture-JvQ0Q5IkeMM-unsplash.jpg'],
        unidades: 1,
        wifi: true,
        lavanderia: false,
      },
      {
        id: 6,
        nombre: 'Seriously Safe Towns',
        ciudad: 'Canoas',
        provincia: 'Manabi',
        foto: ['https://angular.io/assets/images/tutorials/faa/phil-hearing-IYfp2Ixe9nM-unsplash.jpg'],
        unidades: 2,
        wifi: true,
        lavanderia: false,
      }
    ];
  }

  getLista(): casa[] {
    return this.ListaCasas.map((c: casa) => ({
      ...c,
      foto: Array.isArray(c.foto) ? c.foto : [c.foto]
    }));
  }

  getCasaId(id: number): casa | undefined {
    const casa = this.ListaCasas.find(c => c.id === id);
    if (casa) {
      casa.foto = Array.isArray(casa.foto) ? casa.foto : [casa.foto];
    }
    return casa;
  }

  agregarCasa(nuevaCasa: casa): void {
    nuevaCasa.foto = Array.isArray(nuevaCasa.foto) ? nuevaCasa.foto : [nuevaCasa.foto];
    this.ListaCasas.push(nuevaCasa);
    this.saveToLocalStorage();
  }

  eliminarCasa(id: number): void {
    this.ListaCasas = this.ListaCasas.filter(c => c.id !== id);
    this.saveToLocalStorage();
  }

  actualizarCasa(casaActualizada: casa): void {
    const index = this.ListaCasas.findIndex(c => c.id === casaActualizada.id);
    if (index !== -1) {
      casaActualizada.foto = Array.isArray(casaActualizada.foto) ? casaActualizada.foto : [casaActualizada.foto];
      this.ListaCasas[index] = casaActualizada;
      this.saveToLocalStorage();
    }
  }
}
