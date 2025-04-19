import { Routes } from '@angular/router';
import { ClientWelcomeComponent } from './client-welcome/client-welcome.component';
import { ClientFormComponent } from './client-form/client-form.component';

export const routes: Routes = [
    {path:"", component:ClientWelcomeComponent},
    {path:"saisie-adresse", component:ClientFormComponent}
];
