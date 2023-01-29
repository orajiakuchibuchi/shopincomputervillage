import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBarRegisterComponent } from './auth-bar-register.component';

describe('AuthBarRegisterComponent', () => {
  let component: AuthBarRegisterComponent;
  let fixture: ComponentFixture<AuthBarRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBarRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
