import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Address, CompletionService } from 'ign-geos-completion-swagger-client';
import { HttpClient} from '@angular/common/http';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule} from '@angular/material/select';
import { LeafletMapComponent } from "../leaflet-map/leaflet-map.component";
import { RouterLink } from '@angular/router';
import {Feature} from 'geojson';
import type GeoJsonProperties from 'geojson';

@Component({
  selector: 'app-client-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    LeafletMapComponent,RouterLink
  ],
  providers: [CompletionService,HttpClient],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent  {

  protected clientForm!:FormGroup;
  protected matchingAdresses:Address[]=[];
  protected selectedAddress!:Address|undefined;
  protected etat!:string;
  _parcelInfoReceived!:Feature;
  _parcelInfoReceivedProps!:GeoJsonProperties.GeoJsonProperties;
  constructor(private readonly ignService:CompletionService){ 
    this.clientForm = new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      mail:new FormControl(''),    
      address:new FormControl('9 rue du général championnet 77340 pontault combault'),
      address2:new FormControl(''),
      
      parcelId:new FormControl(''),
      pluLink:new FormControl(''),
    });    
  }


  public submitClientForm(){
      console.log("submit");
  }

  updateAdresseSaisie(){
    this.etat="Recherche de correspondances en cours...";
    this.ignService.completion(this.clientForm.value.address, 'METROPOLE', undefined, undefined, undefined, 6, undefined, undefined, false).subscribe({
      next: next=>{
        this.matchingAdresses=next.results;        
      },
      error:error=>console.log(error),
      complete:()=>this.etat='' 
    });
  }

  newLocationSelected(event:MatSelectChange){
    let selectedAddressFulltext = event.value;    
    this.selectedAddress=this.matchingAdresses.find(ad=>ad.fulltext===selectedAddressFulltext);
  }


  //event child
  newParcelInfo(parcelInfoReceived:Feature){
    console.log("parent received by for from child :");
    console.log(parcelInfoReceived);
    this._parcelInfoReceivedProps=(parcelInfoReceived.properties as GeoJsonProperties.GeoJsonProperties);
    this._parcelInfoReceived=parcelInfoReceived;
  }
}
