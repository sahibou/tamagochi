import { Routes } from '@angular/router';
import { ClientWelcomeComponent } from './client-welcome/client-welcome.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientOverComponent } from './client-over/client-over.component';

export const routes: Routes = [
    {path:"", component:ClientWelcomeComponent},
    {path:"saisie-adresse", component:ClientFormComponent},
    {path:"saisie-terminee", component:ClientOverComponent}
];
