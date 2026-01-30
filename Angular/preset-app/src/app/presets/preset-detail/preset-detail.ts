import { Component, OnInit } from '@angular/core';
import { Preset } from '../preset.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PresetsService } from '../../shared/presets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-preset-detail',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatDividerModule, MatListModule, RouterLink],
  templateUrl: './preset-detail.html',
  styleUrl: './preset-detail.css',
})
export class PresetDetail implements OnInit{
  presetTransmis?: Preset;

  constructor(private presetsService: PresetsService,
  private route: ActivatedRoute,
  private router: Router
  ) { }



  ngOnInit(): void {
    this.presetTransmis = this.route.snapshot.data['preset'];
  }
  
  onDeletePreset(){
    this.presetsService.deletePreset(this.presetTransmis!)
      .subscribe(req => {
        this.router.navigate(['/home']);
      });
  }
}
