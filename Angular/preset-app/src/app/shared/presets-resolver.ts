import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PresetsService } from './presets.service';
import { Preset } from '../presets/preset.model';
import { Observable } from 'rxjs';

export const presetsResolver: ResolveFn<Preset[]> = (route, state): Observable<Preset[]> => {
  const service = inject(PresetsService);
  return service.getPresets();
};

