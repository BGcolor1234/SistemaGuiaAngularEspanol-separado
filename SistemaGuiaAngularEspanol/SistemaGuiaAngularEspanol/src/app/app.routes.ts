import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { CrudComponent } from './componentes/crud/crud.component';

export const routes: Routes = [
    {
    path:'',
    component:InicioComponent,
    title:'Pagina Inicio',
    },
    {
      path:'detalles/:id',
      component:DetallesComponent,
      title:'Pagina detalle',
    },

    {
      path:'crud',
      component:CrudComponent,
      title:'Pagina crud',
    }

];
export default routes;
