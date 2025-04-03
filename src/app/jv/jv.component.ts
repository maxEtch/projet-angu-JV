import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JV } from '../models/jv.model';
import { Reservation } from '../models/reservation.model';
import { JVService } from '../services/jv.service';

@Component({
  selector: 'app-jv',
  templateUrl: './jv.component.html',
  styleUrls: ['./jv.component.scss'],
  standalone: false
})
export class JVComponent implements OnInit {
  theJV!: JV;
  reservations: Reservation[] = [];
  loading: boolean = true;

  constructor( private route: ActivatedRoute, private jvService: JVService) { 

  }

  ngOnInit(): void {
    const jvId = this.route.snapshot.paramMap.get('id');
    if (jvId) {
      this.loadJeuDetails(+jvId);
    } else {
      this.loading = false;
    }
  }

  loadJeuDetails(id: number): void {
    this.jvService.getJVById(id).subscribe(
      jeu => {
        this.theJV = jeu;
        this.loadReservations(jeu.titre);
      }
    );
  }

  loadReservations(titreJeu: string): void {
    this.jvService.getReservationsByJeu(titreJeu).subscribe(
      reservations => {
        this.reservations = reservations;
        this.loading = false;
      }
    );
  }

  onAddJV(): void {
    if (this.theJV) {
      this.theJV.stockDisponible++;
      this.jvService.updateJVStock(this.theJV).subscribe(
        updatedJV => {
          this.theJV = updatedJV;
        }
      );
    }
  }

  onRemoveJV(): void {
    if (this.theJV && this.theJV.stockDisponible > 0) {
      this.theJV.stockDisponible--;
      this.jvService.updateJVStock(this.theJV).subscribe(
        updatedJV => {
          this.theJV = updatedJV;
        }
      );
    }
  }
}