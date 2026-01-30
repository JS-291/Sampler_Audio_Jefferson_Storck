import { Routes } from '@angular/router';
import { Presets } from './presets/presets';
import {PresetDetail} from './presets/preset-detail/preset-detail';
import { presetsResolver } from './shared/presets-resolver';
import { presetResolver } from './shared/preset-resolver';
import { PresetRename } from './presets/preset-detail/preset-rename/preset-rename';
import {PresetAdd} from './presets/preset-add/preset-add';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: Presets, resolve: { presets: presetsResolver }},
    {path: "add", component: PresetAdd},
    {path: "presets/:name", component: PresetDetail , resolve: { preset: presetResolver }},
    {path: "presets/:name/rename", component: PresetRename },
];
