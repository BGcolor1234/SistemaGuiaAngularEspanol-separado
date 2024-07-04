import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { CrudComponent } from './componentes/crud/crud.component';
import { InsertarCasaComponent } from './componentes/insertar-casa/insertar-casa.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';

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
    }, 

    {
      path:'insertar',
      component:InsertarCasaComponent,
      title:'Pagina insertar',
    }, 

    {
      path:'admin',
      component:AdministrarComponent,
      title:'Pagina admin',
    }

];
export default routes;
