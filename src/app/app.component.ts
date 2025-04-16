import { Component } from '@angular/core';
import { ClientFormComponent } from './client-form/client-form.component';
@Component({
  selector: 'app-root',
  imports: [ClientFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tamagochi';
}
