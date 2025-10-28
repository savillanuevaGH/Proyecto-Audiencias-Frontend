import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciaModalComponent } from './audiencia-modal.component';

describe('AudienciaModalComponent', () => {
  let component: AudienciaModalComponent;
  let fixture: ComponentFixture<AudienciaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienciaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudienciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
