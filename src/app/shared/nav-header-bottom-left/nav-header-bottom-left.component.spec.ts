import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderBottomLeftComponent } from './nav-header-bottom-left.component';

describe('NavHeaderBottomLeftComponent', () => {
  let component: NavHeaderBottomLeftComponent;
  let fixture: ComponentFixture<NavHeaderBottomLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderBottomLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderBottomLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
