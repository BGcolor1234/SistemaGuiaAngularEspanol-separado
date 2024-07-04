import { Component, OnInit } from '@angular/core';
import { casa } from '../../entidades/casa';
import { CasaService } from '../../servicios/casa.service';
import { RouterLink } from '@angular/router';
import { InsertarCasaComponent } from '../insertar-casa/insertar-casa.component';
import { ModificarCasaComponent } from '../modificar-casa/modificar-casa.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-casa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, InsertarCasaComponent, ModificarCasaComponent],
  templateUrl: './listar-casa.component.html',
  styleUrls: ['./listar-casa.component.css']
})
export class ListarCasaComponent implements OnInit {
  casas: casa[] = [];
  selectedCasa: casa = {
    id: 0,
    nombre: '',
    ciudad: '',
    provincia: '',
    foto: [],
    unidades: 0,
    wifi: false,
    lavanderia: false
  };
  isInsertarModalOpen = false;
  isModificarModalOpen = false;

  constructor(private casaService: CasaService) { }

  ngOnInit(): void {
    this.casas = this.casaService.getLista();
  }

  openInsertarModal(): void {
    this.isInsertarModalOpen = true;
  }

  openModificarModal(casa: casa): void {
    this.selectedCasa = { ...casa };
    this.isModificarModalOpen = true;
  }

  closeInsertarModal(): void {
    this.isInsertarModalOpen = false;
    this.casas = this.casaService.getLista(); // Actualiza la lista después de insertar una nueva casa
  }

  closeModificarModal(): void {
    this.isModificarModalOpen = false;
    this.casas = this.casaService.getLista(); // Actualiza la lista después de modificar una casa
  }

  eliminarCasa(id: number): void {
    this.casaService.eliminarCasa(id);
    this.casas = this.casaService.getLista(); // Actualizar la lista después de eliminar una casa
  }
}
