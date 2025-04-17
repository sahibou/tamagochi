import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCadastreParcelleComponent } from './api-cadastre-parcelle.component';

describe('ApiCadastreParcelleComponent', () => {
  let component: ApiCadastreParcelleComponent;
  let fixture: ComponentFixture<ApiCadastreParcelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCadastreParcelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCadastreParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
