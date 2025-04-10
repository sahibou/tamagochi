import { Inject, Injectable } from '@angular/core';
import { CompletionService, Response } from 'ign-geos-completion-swagger-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IgnAppServiceService {


  constructor(private readonly completionService:CompletionService) { 

  }

  //text: string
    //, terr?: string               METROPOLE, DOMTOM, 75, 75013, 93160,97,77300
    //, poiType?: string            Filtre sur le type de localisant pour le type POI. Les valeurs possibles sont listées dans le getCapabilities du service d'autocompletion.
    //, lonlat?: string             coordonnées (longitude,latitude) d'un localisant pour favoriser les candidats les plus proches.
    //, type?: string               Le type de localisants recherchés. Il est possible de spécifier plusieurs types séparés par une virgule.
//                                    Available values : PositionOfInterest, StreetAddress, PositionOfInterest,StreetAddress
//                                    Default value : PositionOfInterest,StreetAddress
    //, maximumResponses?: number   Le nombre maximum de réponses que l’on souhaite voir retournées (entre 1 et 15) Default value : 10
    //, bbox?: string               Filtre avec une bbox suivant l'ordre xmin,ymin,xmax,ymax
    //, observe?: 'body'
    //, reportProgress?: boolean
  getCompletionData(input:string):Observable<Response>{
    return this.completionService.completion(input, 'METROPOLE', undefined, undefined, undefined, 6, undefined, undefined, false);
  }
}
