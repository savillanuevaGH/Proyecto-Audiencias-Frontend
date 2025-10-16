import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInModalComponent } from './log-in-modal.component';

describe('LogInModalComponent', () => {
  let component: LogInModalComponent;
  let fixture: ComponentFixture<LogInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
