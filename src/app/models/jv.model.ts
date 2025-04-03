export class JV {
    id?: number;
    titre: string;
    plateforme: string;
    genre: string;
    developpeur: string;
    dateSortie: Date;
    stockDisponible: number;
    onsale?: boolean;

    constructor(id:number, titre:string, plateforme:string, genre: string, developpeur: string, dateSortie: Date, stockDisponible: number, onsale?: boolean){
        this.id = id;
        this.titre = titre;
        this.plateforme = plateforme;
        this.genre = genre;
        this.developpeur = developpeur;
        this.dateSortie = dateSortie;
        this.stockDisponible = stockDisponible;
        if (onsale !== undefined) {
            this.onsale = onsale;
        }
    }
}