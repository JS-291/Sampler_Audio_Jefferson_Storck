import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Preset } from '../presets/preset.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presets',
  imports: [MatDividerModule,MatButtonModule,MatListModule, RouterLink, CommonModule],
  templateUrl: './presets.html',
  styleUrl: './presets.css',
})
export class Presets implements OnInit{
    presets: Preset[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.presets = this.route.snapshot.data['presets'];
  }
}
