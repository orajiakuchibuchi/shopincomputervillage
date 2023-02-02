import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditonModalComponent } from './terms-and-conditon-modal.component';

describe('TermsAndConditonModalComponent', () => {
  let component: TermsAndConditonModalComponent;
  let fixture: ComponentFixture<TermsAndConditonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
