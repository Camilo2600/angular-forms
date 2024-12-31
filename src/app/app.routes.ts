import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Para rutas protegidas
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'; // Nuevo diseño principal

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/form-login' },

  // Rutas con el diseño principal
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'carousel', loadChildren: () => import('./carousel/carousel.routes').then(m => m.CAROUSEL_ROUTES) },
      { path: 'table', loadChildren: () => import('./tables/table-ajax/table.routes').then(m => m.TABLE_POKEAPI_ROUTES) },
      { path: 'form-cedula', loadChildren: () => import('./forms/form-cedula/form-cedula.routes').then(m => m.FORM_CEDULA_ROUTES) },
      { path: 'user-manage', loadChildren: () => import('./tables/table-user-manage/table-user.routes').then(m => m.USER_MANAGE_ROUTES) }
    ]
  },

  // Ruta de login (sin diseño principal)
  { path: 'form-login', loadChildren: () => import('./forms/form-login/login-form.routes').then(m => m.LOGIN_FORM_ROUTES) }
];
