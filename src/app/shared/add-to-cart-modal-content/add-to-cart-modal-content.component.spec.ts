import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartModalContentComponent } from './add-to-cart-modal-content.component';

describe('AddToCartModalContentComponent', () => {
  let component: AddToCartModalContentComponent;
  let fixture: ComponentFixture<AddToCartModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
