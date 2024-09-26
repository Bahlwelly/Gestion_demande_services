import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteFournisseursComponent } from './ajoute-fournisseurs.component';

describe('AjouteFournisseursComponent', () => {
  let component: AjouteFournisseursComponent;
  let fixture: ComponentFixture<AjouteFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouteFournisseursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouteFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
