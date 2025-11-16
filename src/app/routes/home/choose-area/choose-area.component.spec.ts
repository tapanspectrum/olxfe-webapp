import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAreaComponent } from './choose-area.component';

describe('ChooseAreaComponent', () => {
  let component: ChooseAreaComponent;
  let fixture: ComponentFixture<ChooseAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
