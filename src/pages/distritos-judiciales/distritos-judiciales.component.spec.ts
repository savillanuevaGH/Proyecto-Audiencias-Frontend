import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritosJudicialesComponent } from './distritos-judiciales.component';

describe('DistritosJudicialesComponent', () => {
  let component: DistritosJudicialesComponent;
  let fixture: ComponentFixture<DistritosJudicialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritosJudicialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritosJudicialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
