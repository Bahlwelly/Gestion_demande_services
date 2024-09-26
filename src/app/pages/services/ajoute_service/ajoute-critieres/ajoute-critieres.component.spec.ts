import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteCritieresComponent } from './ajoute-critieres.component';

describe('AjouteCritieresComponent', () => {
  let component: AjouteCritieresComponent;
  let fixture: ComponentFixture<AjouteCritieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouteCritieresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouteCritieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
