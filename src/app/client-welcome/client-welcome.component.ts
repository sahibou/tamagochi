import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-welcome',
  imports: [ MatButtonModule, RouterLink],
  templateUrl: './client-welcome.component.html',
  styleUrl: './client-welcome.component.scss'
})
export class ClientWelcomeComponent {

}
