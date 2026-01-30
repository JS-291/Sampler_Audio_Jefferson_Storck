import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Presets } from './presets';

describe('Presets', () => {
  let component: Presets;
  let fixture: ComponentFixture<Presets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Presets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Presets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
