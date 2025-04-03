import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { JVService } from '../services/jv.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
  standalone: false
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  loading: boolean = true;

  constructor(private jvService: JVService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.jvService.getAllReservations().subscribe(
      reservations => {
        this.reservations = reservations;
        this.filteredReservations = [...reservations];
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesTerm = 
        reservation.nomClient.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        reservation.titreJeu.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reservation.emailClient.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatus ? reservation.statut === this.selectedStatus : true;
      
      return matchesTerm && matchesStatus;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.filteredReservations = [...this.reservations];
  }

}