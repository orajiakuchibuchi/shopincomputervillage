import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBarStatusComponent } from './auth-bar-status.component';

describe('AuthBarStatusComponent', () => {
  let component: AuthBarStatusComponent;
  let fixture: ComponentFixture<AuthBarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBarStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
