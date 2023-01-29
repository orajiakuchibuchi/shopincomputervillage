import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSocialAuthComponent } from './auth-social-auth.component';

describe('AuthSocialAuthComponent', () => {
  let component: AuthSocialAuthComponent;
  let fixture: ComponentFixture<AuthSocialAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSocialAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSocialAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
