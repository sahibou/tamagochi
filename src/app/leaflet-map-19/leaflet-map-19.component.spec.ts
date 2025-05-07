import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMap19Component } from './leaflet-map-19.component';

describe('LeafletMap19Component', () => {
  let component: LeafletMap19Component;
  let fixture: ComponentFixture<LeafletMap19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafletMap19Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafletMap19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
