import { Component } from '@angular/core';
import { Preset } from '../preset.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { PresetsService } from '../../shared/presets.service';
import { Router } from '@angular/router';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-preset-add',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, MatCheckboxModule, MatDivider],
  templateUrl: './preset-add.html',
  styleUrl: './preset-add.css',
})
export class PresetAdd {
  namePreset="";
  typePreset="";
  isFac=false;
  files:File[]=[];

  constructor(private presetsService: PresetsService,
  private router: Router){}

  onSelected(event :Event){
    const input=event.target as HTMLInputElement;
    if(!input.files)return;
    this.files=Array.from(input.files);
  }

  onSubmit(){
        const newPreset = new Preset();
        newPreset.name=this.namePreset;
        newPreset.type=this.typePreset;
        newPreset.isFactoryPresets=this.isFac;
        newPreset.samples=[];
        this.files.forEach(x =>{
          const newUrl=`./${this.namePreset}/${x.name}`
          newPreset.samples.push({name:x.name.replace(/\.[^/.]+$/, ""), url:newUrl});
        });
        this.presetsService.addPreset(newPreset,this.files).subscribe(x=>{
          console.log(x);
          this.router.navigate(['/home']);
        });
  }


}
