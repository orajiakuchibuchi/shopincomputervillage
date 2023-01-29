import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderBottomRightComponent } from './nav-header-bottom-right.component';

describe('NavHeaderBottomRightComponent', () => {
  let component: NavHeaderBottomRightComponent;
  let fixture: ComponentFixture<NavHeaderBottomRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderBottomRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderBottomRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
