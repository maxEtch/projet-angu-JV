import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JV } from '../models/jv.model';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class JVService {
  private apiUrl = 'http://localhost:3000'; // URL du server JSON

  constructor(private http: HttpClient) { }


  /*méthodes des Jv*/
  getAllJV(): Observable<JV[]> {
    return this.http.get<JV[]>(`${this.apiUrl}/jeux`);
  }

  getJVById(id: number): Observable<JV> {
    return this.http.get<JV>(`${this.apiUrl}/jeux/${id}`);
  }


  /*méthodes des reservations*/
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  getReservationsByJeu(titreJeu: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations?titreJeu=${titreJeu}`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/reservations/${reservation.id}`, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservations/${id}`);
  }

  //mise a jour du stock d'un jeu
  updateJVStock(jv: JV): Observable<JV> {
    return this.http.put<JV>(`${this.apiUrl}/jeux/${jv.id}`, jv);
  }
}