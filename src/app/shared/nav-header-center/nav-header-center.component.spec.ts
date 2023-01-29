import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderCenterComponent } from './nav-header-center.component';

describe('NavHeaderCenterComponent', () => {
  let component: NavHeaderCenterComponent;
  let fixture: ComponentFixture<NavHeaderCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
