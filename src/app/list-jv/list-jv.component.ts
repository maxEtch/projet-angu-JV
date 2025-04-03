import { Component, OnInit } from '@angular/core';
import { JV } from '../models/jv.model';
import { JVService } from '../services/jv.service';

@Component({
  selector: 'app-list-jv',
  templateUrl: './list-jv.component.html',
  styleUrls: ['./list-jv.component.scss'],
  standalone: false
})
export class ListJVComponent implements OnInit {
  listJV: JV[] = [];
  filteredJV: JV[] = [];
  searchTerm: string = '';
  selectedPlatform: string = '';
  selectedGenre: string = '';
  platforms: string[] = [];
  genres: string[] = [];

  loading: boolean = false;

  constructor(private jvService: JVService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadJeux();
  }

  loadJeux(): void {
    this.jvService.getAllJV().subscribe(
      jeux => {
        this.listJV = jeux;
        this.filteredJV = [...jeux];
        
        this.platforms = [...new Set(jeux.map(jv => jv.plateforme))];
        this.genres = [...new Set(jeux.map(jv => jv.genre))];
      }
    );
  }

  //FILTRE
  applyFilters(): void {
    this.filteredJV = this.listJV.filter(jv => {
      const matchesTerm = jv.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          jv.developpeur.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPlatform = this.selectedPlatform ? jv.plateforme === this.selectedPlatform : true;
      const matchesGenre = this.selectedGenre ? jv.genre === this.selectedGenre : true;
      
      return matchesTerm && matchesPlatform && matchesGenre;
    });
  }
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedPlatform = '';
    this.selectedGenre = '';
    this.filteredJV = [...this.listJV];
  }
}