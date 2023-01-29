import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderTopComponent } from './nav-header-top.component';

describe('NavHeaderTopComponent', () => {
  let component: NavHeaderTopComponent;
  let fixture: ComponentFixture<NavHeaderTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
