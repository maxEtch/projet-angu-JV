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

  // Bonus: méthode pour modifier le statut d'une réservation
  updateStatus(reservation: Reservation, newStatus: 'Confirmée' | 'En attente' | 'Annulée'): void {
    const updatedReservation = { ...reservation, statut: newStatus };
    
    this.jvService.updateReservation(updatedReservation).subscribe(
      updated => {
        // Mettre à jour la liste locale
        const index = this.reservations.findIndex(r => r.id === updated.id);
        if (index !== -1) {
          this.reservations[index] = updated;
          this.applyFilters(); // Réappliquer les filtres pour actualiser la liste affichée
        }
      },
      error => {
        console.error('Erreur lors de la mise à jour du statut:', error);
        alert('Une erreur est survenue lors de la mise à jour du statut.');
      }
    );
  }

  // Bonus: méthode pour supprimer une réservation
  deleteReservation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.jvService.deleteReservation(id).subscribe(
        () => {
          // Mettre à jour la liste locale
          this.reservations = this.reservations.filter(r => r.id !== id);
          this.applyFilters(); // Réappliquer les filtres pour actualiser la liste affichée
        },
        error => {
          console.error('Erreur lors de la suppression de la réservation:', error);
          alert('Une erreur est survenue lors de la suppression de la réservation.');
        }
      );
    }
  }
}