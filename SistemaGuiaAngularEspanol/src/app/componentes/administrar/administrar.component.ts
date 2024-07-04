import { Component } from '@angular/core';
import { ListarCasaComponent } from '../listar-casa/listar-casa.component';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [ListarCasaComponent],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css'
})
export class AdministrarComponent {

}
