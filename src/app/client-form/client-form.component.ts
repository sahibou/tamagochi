import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Address, CompletionService } from 'ign-geos-completion-swagger-client';
import { HttpClient} from '@angular/common/http';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  providers: [CompletionService,HttpClient],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent  {
  
  // private searchSubject = new Subject();
  // private readonly debounceTimeMs = 300; // Set the debounce time (in milliseconds)

  // ngOnInit() {
  //   this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
  //     this.performSearch(searchValue);
  //   });
  // }

  // this.searchSubject.pipe(
  //   debounceTime(this.debounceTimeMs),
  //   distinctUntilChanged(),
  //   switchMap((searchValue) => this.searchService.search(searchValue))
  // ).subscribe((results) => (this.searchResults = results));

  protected clientForm!:FormGroup;
  protected matchingAdresses:Address[]=[];

  constructor(private readonly ignService:CompletionService){ 
    this.clientForm = new FormGroup({
      firstName:new FormControl('firstname'),
      lastName:new FormControl('lastname'),
      mail:new FormControl('mail'),    
      address:new FormControl('address'),
      address2:new FormControl('address2'),
      
      parcelId:new FormControl('parcel-id'),
      pluLink:new FormControl('plu-link'),
    });    
  }


  public submitClientForm(){
      console.log("submit");
  }

  updateAdresseSaisie(){
    this.ignService.completion(this.clientForm.value.address, 'METROPOLE', undefined, undefined, undefined, 6, undefined, undefined, false).subscribe({
      next: next=>{
        this.matchingAdresses=next.results;
        console.log(this.matchingAdresses);
      },
      error:error=>console.log(error),
      complete:()=>console.log("terminé")
    });
  }
}
