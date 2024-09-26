import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierApercuComponent } from './modifier-apercu.component';

describe('ModifierApercuComponent', () => {
  let component: ModifierApercuComponent;
  let fixture: ComponentFixture<ModifierApercuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierApercuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierApercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
