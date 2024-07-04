import { Component, Input, OnInit, Output, EventEmitter, inject, INJECTOR } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CasaService } from '../../servicios/casa.service';
import { casa } from '../../entidades/casa';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-modificar-casa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './modificar-casa.component.html',
  styleUrls: ['./modificar-casa.component.css']
})
export class ModificarCasaComponent implements OnInit {
  @Input() selectedCasa: casa | null = null;
  @Output() close = new EventEmitter<void>();
  casaForm: FormGroup;
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
    if (this.selectedCasa) {
      this.casaForm.patchValue({
        nombre: this.selectedCasa.nombre,
        ciudad: this.selectedCasa.ciudad,
        provincia: this.selectedCasa.provincia,
        unidades: this.selectedCasa.unidades,
        wifi: this.selectedCasa.wifi,
        lavanderia: this.selectedCasa.lavanderia
      });
      this.fotos.clear();
      const fotosArray = Array.isArray(this.selectedCasa.foto) ? this.selectedCasa.foto : [this.selectedCasa.foto];
      fotosArray.forEach(f => this.fotos.push(this.fb.control(f, Validators.required)));
    }
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

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.casaForm.valid && this.selectedCasa) {
      const casaActualizada: casa = {
        id: this.selectedCasa.id,
        ...this.casaForm.value,
        foto: this.casaForm.value.foto.filter((url: string) => url.trim() !== '')
      };
      this.oservice.actualizarCasa(casaActualizada);
      this.closeModal();
    }
  }
}
