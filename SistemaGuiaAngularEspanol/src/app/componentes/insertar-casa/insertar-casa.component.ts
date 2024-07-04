import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CasaService } from '../../servicios/casa.service';
import { casa } from '../../entidades/casa';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertar-casa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './insertar-casa.component.html',
  styleUrls: ['./insertar-casa.component.css']
})
export class InsertarCasaComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  casaForm: FormGroup;
  isOpen = true;

  constructor(private fb: FormBuilder, private oservice: CasaService) {
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

  ngOnInit(): void {}

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
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  onSubmit() {
    if (this.casaForm.valid) {
      const nuevaCasa: casa = {
        id: this.oservice.getLista().length > 0 ? Math.max(...this.oservice.getLista().map(c => c.id)) + 1 : 0,
        ...this.casaForm.value,
        foto: this.casaForm.value.foto.filter((url: string) => url.trim() !== '') // Filtrar enlaces vacíos
      };
      console.log('Nueva Casa:', nuevaCasa); // Imprime la nueva casa en la consola
      this.oservice.agregarCasa(nuevaCasa);
      this.closeModal();
    }
  }
}
