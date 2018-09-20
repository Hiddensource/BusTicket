import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomanslandComponent } from './nomansland.component';

describe('NomanslandComponent', () => {
  let component: NomanslandComponent;
  let fixture: ComponentFixture<NomanslandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomanslandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomanslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
