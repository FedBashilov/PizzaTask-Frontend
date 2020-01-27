import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPageComponent } from './pages/menu-page/menu-page.component';

const routes: Routes = [
    {path: '', redirectTo: 'menu', pathMatch: 'full'},
    {path: 'menu', component: MenuPageComponent},
    {path: '**', redirectTo: 'menu', pathMatch: 'full'}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MenuPageComponent]
