import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCriteresComponent } from './modifier-criteres.component';

describe('ModifierCriteresComponent', () => {
  let component: ModifierCriteresComponent;
  let fixture: ComponentFixture<ModifierCriteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCriteresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierCriteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
