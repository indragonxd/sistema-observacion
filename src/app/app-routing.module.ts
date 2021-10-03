import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AdminGuard } from './core/admin.guard';
const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        //component: HomeComponent
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      },
      {
        path: 'usuarios',
        //component: HomeComponent
        loadChildren: () => import("./usuarios/usuarios.module").then(m => m.UsuariosModule)
      },
      {
        path: 'vehiculos',
        //component: HomeComponent
        loadChildren: () => import("./vehiculos/vehiculos.module").then(m => m.VehiculosModule)
      },
      {
        path: 'observaciones',
        //component: HomeComponent
        loadChildren: () => import("./observaciones/observaciones.module").then(m => m.ObservacionesModule)
      }
    ]
  },
  {
    path: "login",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "**",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
