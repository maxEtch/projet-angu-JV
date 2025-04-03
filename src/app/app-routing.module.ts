// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJVComponent } from './list-jv/list-jv.component';
import { JVComponent } from './jv/jv.component';
import { ReservationComponent } from './reservation/reservation.component'; 
import { ReservationListComponent } from './reservation-list/reservation-list.component';
const routes: Routes = [
  { path: '', redirectTo: '/jeux', pathMatch: 'full' },
  { path: 'jeux', component: ListJVComponent },
  { path: 'jeux/:id', component: JVComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'list-reservation', component: ReservationListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }