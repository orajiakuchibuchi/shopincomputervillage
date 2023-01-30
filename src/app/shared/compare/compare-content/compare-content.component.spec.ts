import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareContentComponent } from './compare-content.component';

describe('CompareContentComponent', () => {
  let component: CompareContentComponent;
  let fixture: ComponentFixture<CompareContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
