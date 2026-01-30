import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PresetsService } from './presets.service';
import { Preset } from '../presets/preset.model';
import { Observable } from 'rxjs';

export const presetResolver: ResolveFn<Preset> = (route, state): Observable<Preset> => {
  const service = inject(PresetsService);
  const name = route.paramMap.get('name');
  if (!name) throw new Error('Preset name is missing in route');
  return service.getPreset(name);
};