import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeNoticeComponent } from './welcome-notice.component';

describe('WelcomeNoticeComponent', () => {
  let component: WelcomeNoticeComponent;
  let fixture: ComponentFixture<WelcomeNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
