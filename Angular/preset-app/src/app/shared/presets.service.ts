import { Injectable } from '@angular/core';
import { Preset } from '../presets/preset.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PresetsService {
  backendURL="http://localhost:8010/api/presets";

  constructor(private http: HttpClient){}


  getPresets(): Observable<Preset[]> {
    return this.http.get<Preset[]>(this.backendURL);
  }

  getPreset(name:string): Observable<Preset> {
    return this.http.get<Preset>(this.backendURL+'/'+name);
  }

  deletePreset(preset: Preset): Observable<Object> {
    return this.http.delete(`${this.backendURL}/${preset.name}`);
  }

  renamePreset(name :string ,preset: Preset): Observable<Object> {
    return this.http.put<Preset>(`${this.backendURL}/${name}`, preset);
  }

  addPreset(preset:Preset, files:File[]):Observable<Object>{
    const formData=new FormData();
    formData.append('data',JSON.stringify(preset));
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    return this.http.post(this.backendURL,formData);
  }
}
