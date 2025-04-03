import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JV } from '../models/jv.model';
import { Reservation } from '../models/reservation.model';
import { JVService } from '../services/jv.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: false
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  jeux: JV[] = [];
  selectedJeu: JV | null = null;
  submitting = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private jvService: JVService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadJeux();
    
    // Vérifie si un jeu est spécifié dans l'URL
    const jeuId = this.route.snapshot.queryParamMap.get('jeuId');
    if (jeuId) {
      this.jvService.getJVById(+jeuId).subscribe(
        jeu => {
          this.selectedJeu = jeu;
          this.reservationForm.patchValue({
            titreJeu: jeu.titre,
            plateforme: jeu.plateforme
          });
        }
      );
    }
  }

  createForm(): void {
    this.reservationForm = this.fb.group({
      nomClient: ['', [Validators.required, Validators.minLength(2)]],
      emailClient: ['', [Validators.required, Validators.email]],
      numeroTelephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      titreJeu: ['', Validators.required],
      plateforme: ['', Validators.required],
      dateReservation: [new Date().toISOString().split('T')[0], Validators.required],
      statut: ['En attente', Validators.required]
    });
  }

  loadJeux(): void {
    this.jvService.getAllJV().subscribe(
      jeux => {
        this.jeux = jeux;
      }
    );
  }

  onJeuSelected(event: any): void {
    const titreJeu = event.target.value;
    const jeu = this.jeux.find(j => j.titre === titreJeu);
    
    if (jeu) {
      this.selectedJeu = jeu;
      this.reservationForm.patchValue({
        plateforme: jeu.plateforme
      });
    }
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      Object.keys(this.reservationForm.controls).forEach(key => {
        this.reservationForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const formValue = this.reservationForm.value;
    
    // Vérifier le stock disponible (>0)
    if (this.selectedJeu && this.selectedJeu.stockDisponible <= 0) {
      alert('Désolé, ce jeu n est plus en stock.');
      this.submitting = false;
      return;
    }

    const newReservation: Reservation = new Reservation(
      0, formValue.nomClient, formValue.emailClient, formValue.numeroTelephone, formValue.titreJeu, formValue.plateforme, new Date(formValue.dateReservation), formValue.statut
    );

    this.jvService.addReservation(newReservation).subscribe(
      () => {
        // Mettre à jour le stock si nécessaire
        if (this.selectedJeu) {
          this.selectedJeu.stockDisponible--;
          this.jvService.updateJVStock(this.selectedJeu).subscribe();
        }
        
        this.submitted = true;
        this.submitting = false;

        this.router.navigate(['/jeux']);
      }
    );
  }
}