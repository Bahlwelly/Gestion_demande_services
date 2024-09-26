import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFournisseursComponent } from './details-fournisseurs.component';

describe('DetailsFournisseursComponent', () => {
  let component: DetailsFournisseursComponent;
  let fixture: ComponentFixture<DetailsFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsFournisseursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
