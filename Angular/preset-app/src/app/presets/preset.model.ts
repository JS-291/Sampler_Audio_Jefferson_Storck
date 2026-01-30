export class Preset {
    name!: string;
    type!: string;
    isFactoryPresets!: boolean;
    samples!: { url: string; name: string }[];
};