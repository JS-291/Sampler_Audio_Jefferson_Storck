import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Presets } from './presets/presets';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Presets],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('preset-app');
}
