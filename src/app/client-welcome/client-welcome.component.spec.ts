import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWelcomeComponent } from './client-welcome.component';

describe('ClientWelcomeComponent', () => {
  let component: ClientWelcomeComponent;
  let fixture: ComponentFixture<ClientWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
