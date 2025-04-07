import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  
  protected clientForm:FormGroup = new FormGroup({
    firstName:new FormControl('first-name'),
    lastname:new FormControl('last-name'),
    mail:new FormControl('mail'),    
    address:new FormControl('address'),
    postCode:new FormControl('post-code'),
    city:new FormControl('city'),
    parcelId:new FormControl('parcel-id'),
    pluLink:new FormControl('plu-link'),
  });

  public submitClientForm(){
    
  }
}
