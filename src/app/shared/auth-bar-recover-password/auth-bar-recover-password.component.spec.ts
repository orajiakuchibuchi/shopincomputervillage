import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBarRecoverPasswordComponent } from './auth-bar-recover-password.component';

describe('AuthBarRecoverPasswordComponent', () => {
  let component: AuthBarRecoverPasswordComponent;
  let fixture: ComponentFixture<AuthBarRecoverPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBarRecoverPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBarRecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
