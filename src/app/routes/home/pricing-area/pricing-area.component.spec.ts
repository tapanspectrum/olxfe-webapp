import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingAreaComponent } from './pricing-area.component';

describe('PricingAreaComponent', () => {
  let component: PricingAreaComponent;
  let fixture: ComponentFixture<PricingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
