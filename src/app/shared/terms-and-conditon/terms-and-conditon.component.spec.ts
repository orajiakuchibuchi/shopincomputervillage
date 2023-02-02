import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditonComponent } from './terms-and-conditon.component';

describe('TermsAndConditonComponent', () => {
  let component: TermsAndConditonComponent;
  let fixture: ComponentFixture<TermsAndConditonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
