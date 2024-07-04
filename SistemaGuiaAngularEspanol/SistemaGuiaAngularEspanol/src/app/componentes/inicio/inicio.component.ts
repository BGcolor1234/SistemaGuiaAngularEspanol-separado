// inicio.component.ts
import { Component, inject } from '@angular/core';
import { LocalizacionCasaComponent } from '../localizacion-casa/localizacion-casa.component';
import { CasaService } from '../../servicios/casa.service';
import { casa } from '../../entidades/casa';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, LocalizacionCasaComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  Lista: casa[] = [];
  casaForm: FormGroup;
  oservice: CasaService = inject(CasaService);

  constructor(private fb: FormBuilder) {
    this.Lista = this.oservice.getLista();
    this.casaForm = this.fb.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      foto: this.fb.array([this.fb.control('', Validators.required)]),
      unidades: [0, [Validators.required, Validators.min(1)]],
      wifi: [false],
      lavanderia: [false]
    });
  }

  get fotos() {
    return this.casaForm.get('foto') as FormArray;
  }

  addFoto() {
    this.fotos.push(this.fb.control('', Validators.required));
  }

  removeFoto(index: number) {
    this.fotos.removeAt(index);
  }

  openModal() {
    document.getElementById('modal')?.classList.remove('hidden');
  }

  closeModal() {
    document.getElementById('modal')?.classList.add('hidden');
  }

  onSubmit() {
    if (this.casaForm.valid) {
      const nuevaCasa: casa = {
        id: this.Lista.length > 0 ? Math.max(...this.Lista.map(c => c.id)) + 1 : 0,
        ...this.casaForm.value,
        foto: this.casaForm.value.foto.filter((url: string) => url.trim() !== '') // Filtrar enlaces vacíos
      };
      console.log('Nueva Casa:', nuevaCasa); // Imprime la nueva casa en la consola
      this.oservice.agregarCasa(nuevaCasa);
      this.Lista = this.oservice.getLista();
      this.casaForm.reset({
        nombre: '',
        ciudad: '',
        provincia: '',
        foto: this.fb.array([this.fb.control('', Validators.required)]),
        unidades: 0,
        wifi: false,
        lavanderia: false
      });
      this.closeModal();
    }
  }
}
