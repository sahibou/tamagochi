import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOverComponent } from './client-over.component';

describe('ClientOverComponent', () => {
  let component: ClientOverComponent;
  let fixture: ComponentFixture<ClientOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientOverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
