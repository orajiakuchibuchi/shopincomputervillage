import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderBottomCenterComponent } from './nav-header-bottom-center.component';

describe('NavHeaderBottomCenterComponent', () => {
  let component: NavHeaderBottomCenterComponent;
  let fixture: ComponentFixture<NavHeaderBottomCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderBottomCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderBottomCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
