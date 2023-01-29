import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortpanelComponent } from './sortpanel.component';

describe('SortpanelComponent', () => {
  let component: SortpanelComponent;
  let fixture: ComponentFixture<SortpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
