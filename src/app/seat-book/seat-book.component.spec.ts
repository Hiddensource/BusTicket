import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookComponent } from './seat-book.component';

describe('SeatBookComponent', () => {
  let component: SeatBookComponent;
  let fixture: ComponentFixture<SeatBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
