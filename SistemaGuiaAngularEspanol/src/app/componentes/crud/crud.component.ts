import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CasaService } from '../../servicios/casa.service';
import { casa } from '../../entidades/casa';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})


export class CrudComponent implements OnInit {
  Lista: casa[] = [];
  casaForm: FormGroup;
  currentCasaId: number | null = null;
  oservice: CasaService = inject(CasaService);

  constructor(private fb: FormBuilder) {
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

  ngOnInit(): void {
    this.Lista = this.oservice.getLista();
    console.log("Lista de casas cargada:", this.Lista);
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

  openModal(casa: casa) {
    this.currentCasaId = casa.id;
    this.casaForm.patchValue({
      nombre: casa.nombre,
      ciudad: casa.ciudad,
      provincia: casa.provincia,
      unidades: casa.unidades,
      wifi: casa.wifi,
      lavanderia: casa.lavanderia
    });
    this.fotos.clear();
    const fotosArray = Array.isArray(casa.foto) ? casa.foto : [casa.foto];
    fotosArray.forEach(f => this.fotos.push(this.fb.control(f, Validators.required)));
    document.getElementById('crud-modal')?.classList.remove('hidden');
  }

  closeModal() {
    document.getElementById('crud-modal')?.classList.add('hidden');
  }

  onSubmit() {
    if (this.casaForm.valid && this.currentCasaId !== null) {
      const casaActualizada: casa = {
        id: this.currentCasaId,
        ...this.casaForm.value,
        foto: this.casaForm.value.foto.filter((url: string) => url.trim() !== '')
      };
      this.oservice.actualizarCasa(casaActualizada);
      this.Lista = this.oservice.getLista();
      console.log("Casa actualizada:", casaActualizada);
      this.closeModal();
    }
  }

  eliminarCasa(id: number) {
    this.oservice.eliminarCasa(id);
    this.Lista = this.oservice.getLista();
    console.log("Casa eliminada:", id);
  }
}
