import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBarLoginComponent } from './auth-bar-login.component';

describe('AuthBarLoginComponent', () => {
  let component: AuthBarLoginComponent;
  let fixture: ComponentFixture<AuthBarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
