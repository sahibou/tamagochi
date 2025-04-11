import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Address, CompletionService } from 'ign-geos-completion-swagger-client';
import { HttpClient} from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  providers: [CompletionService,HttpClient],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  
  protected clientForm!:FormGroup;
  private previousAddressValue:string="";
  protected matchingAdresses:Address[]=[];

  constructor(private readonly ignService:CompletionService){ 
    this.clientForm = new FormGroup({
      firstName:new FormControl('firstname'),
      lastName:new FormControl('lastname'),
      mail:new FormControl('mail'),    
      address:new FormControl('address'),
      postCode:new FormControl('post-code'),
      city:new FormControl('city'),
      parcelId:new FormControl('parcel-id'),
      pluLink:new FormControl('plu-link'),
    });    
  }
  ngOnInit(): void {
    interval(5000).subscribe((num)=>{
      console.log(num);
      if(this.previousAddressValue!==this.clientForm?.value.address){
        this.updateAdresseSaisie();
      }
    });
  }



  public submitClientForm(){
      console.log("bye");
  }

  updateAdresseSaisie(){
    this.ignService.completion('9 rue de la bas', 'METROPOLE', undefined, undefined, undefined, 6, undefined, undefined, false).subscribe({
      next: next=>{
        this.matchingAdresses=next.results;
        console.log(this.matchingAdresses);
      },
      error:error=>console.log(error),
      complete:()=>console.log("terminé")
    });
  }
}
