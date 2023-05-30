import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FjTableComponent } from './fj-table.component';

describe('FjTableComponent', () => {
  let component: FjTableComponent;
  let fixture: ComponentFixture<FjTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FjTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FjTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
