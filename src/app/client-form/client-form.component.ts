import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule ,Validators} from '@angular/forms';
import { Address, CompletionService } from 'ign-geos-completion-swagger-client';
import { HttpClient} from '@angular/common/http';
import { MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule} from '@angular/material/select';
import { LeafletMapComponent } from "../leaflet-map/leaflet-map.component";
import { Router, RouterLink } from '@angular/router';
import {Feature} from 'geojson';
import type GeoJsonProperties from 'geojson';
import { LeafletMap19Component } from "../leaflet-map-19/leaflet-map-19.component";


@Component({
  selector: 'app-client-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBar,
    MatSelectModule,
    LeafletMapComponent, RouterLink,
    LeafletMap19Component
],
  providers: [CompletionService,HttpClient],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent  {

  protected clientForm!:FormGroup;
  protected matchingAdresses:Address[]=[];
  protected selectedAddress!:Address|undefined;
  protected chargementAdressesTente:boolean=false;
  protected chargementAdressesEnCours:boolean=false;
  _parcelInfoReceived!:Feature;
  _parcelInfoReceivedProps!:GeoJsonProperties.GeoJsonProperties;

  private _snackBar = inject(MatSnackBar);
  constructor(private readonly ignService:CompletionService, private _router:Router){ 
    this.clientForm = new FormGroup({
      firstName:new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastName:new FormControl('',[Validators.required, Validators.minLength(2)]),
      mail:new FormControl(''),    
      address:new FormControl('3 Rue de l\'Abbé Rozier, 69001 Lyon',[Validators.required]),
      address2:new FormControl(''),
      parcelId:new FormControl(''),
      pluLink:new FormControl(''),
    });    
  }

  get firstName(){
    return this.clientForm.get('firstName');
  }
  get lastName(){
    return this.clientForm.get('lastName');
  }
  get address(){
    return this.clientForm.get('address');
  }
  public submitClientForm(e:Event){
    if(this.clientForm.invalid || this._parcelInfoReceived===undefined){
      this._snackBar.open('Le formulaire contient des erreurs, veuillez vérifier votre saisie et selectionner une parcelle', 'Undo', {
        duration: 5000
      });
    }else{
      this._snackBar.open('Informations sauvegardés', 'Undo', {
        duration: 3000
      });
      this._router.navigate(['saisie-terminee']);
    }
    
  }

  updateAdresseSaisie(){
    this.chargementAdressesEnCours=true;
    this.chargementAdressesTente=true;
    this.ignService.completion(this.clientForm.value.address, 'METROPOLE', undefined, undefined, undefined, 6, undefined, undefined, false).subscribe({
      next: next=>{
        this.matchingAdresses=next.results;        
      },
      error:error=>console.log(error),
      complete:()=>this.chargementAdressesEnCours=false
    });
  }

  newLocationSelected(event:MatSelectChange){
    let selectedAddressFulltext = event.value;    
    this.selectedAddress=this.matchingAdresses.find(ad=>ad.fulltext===selectedAddressFulltext);
  }

  newParcelInfo(parcelInfoReceived:Feature){
    console.log("parent received by for from child :");
    console.log(parcelInfoReceived);
    this._parcelInfoReceivedProps=(parcelInfoReceived.properties as GeoJsonProperties.GeoJsonProperties);
    this._parcelInfoReceived=parcelInfoReceived;
  }
}
