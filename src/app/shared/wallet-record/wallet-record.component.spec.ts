import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRecordComponent } from './wallet-record.component';

describe('WalletRecordComponent', () => {
  let component: WalletRecordComponent;
  let fixture: ComponentFixture<WalletRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
