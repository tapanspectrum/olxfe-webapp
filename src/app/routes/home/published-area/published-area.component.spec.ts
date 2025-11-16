import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedAreaComponent } from './published-area.component';

describe('PublishedAreaComponent', () => {
  let component: PublishedAreaComponent;
  let fixture: ComponentFixture<PublishedAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
