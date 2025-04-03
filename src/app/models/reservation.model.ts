export class Reservation {
    id?: number;
    nomClient: string;
    emailClient: string;
    numeroTelephone: string;
    titreJeu: string;
    plateforme: string;
    dateReservation: Date;
    statut: 'Confirmée' | 'En attente' | 'Annulée';
    
    constructor(id: number, nomClient: string, emailClient: string, numeroTelephone: string, titreJeu: string, plateforme: string, dateReservation: Date, statut: 'Confirmée' | 'En attente' | 'Annulée') {
        this.id = id;
        this.nomClient = nomClient;
        this.emailClient = emailClient;
        this.numeroTelephone = numeroTelephone;
        this.titreJeu = titreJeu;
        this.plateforme = plateforme;
        this.dateReservation = dateReservation;
        this.statut = statut;
    }
}