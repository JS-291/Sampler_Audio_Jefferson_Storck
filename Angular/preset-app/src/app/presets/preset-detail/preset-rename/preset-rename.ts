import { Component, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Preset } from '../../preset.model';
import { PresetsService } from '../../../shared/presets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preset-rename',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './preset-rename.html',
  styleUrl: './preset-rename.css',
})
export class PresetRename {

  namePreset = '';


  constructor(
    private presetsService: PresetsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

    

  onSubmit() {
    const oldName=this.route.snapshot.params['name'];

    if (!this.namePreset || this.namePreset === oldName) {
      return;
    }
      
      this.presetsService.getPreset(oldName).subscribe((basePreset=>{
        const newPreset = new Preset();
        newPreset.name=this.namePreset;
        newPreset.type=basePreset.type;
        newPreset.isFactoryPresets=basePreset.isFactoryPresets;
        newPreset.samples=[];
        basePreset.samples.forEach(x =>{
          const newUrl=x.url.replace(basePreset.name, this.namePreset);
          newPreset.samples.push({name:x.name, url:newUrl});
        });
        this.presetsService.renamePreset(basePreset.name,newPreset)
            .subscribe(message => {
              this.router.navigate(['/home']);
            });
      }));
    }
}
