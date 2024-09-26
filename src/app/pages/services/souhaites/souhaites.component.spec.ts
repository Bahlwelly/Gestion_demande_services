import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouhaitesComponent } from './souhaites.component';

describe('SouhaitesComponent', () => {
  let component: SouhaitesComponent;
  let fixture: ComponentFixture<SouhaitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SouhaitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SouhaitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
