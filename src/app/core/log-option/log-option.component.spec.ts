import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOptionComponent } from './log-option.component';

describe('LogOptionComponent', () => {
  let component: LogOptionComponent;
  let fixture: ComponentFixture<LogOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
