import { Component,Input } from '@angular/core';
import { JV } from '../app/models/jv.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @Input() JV!: JV;
}
