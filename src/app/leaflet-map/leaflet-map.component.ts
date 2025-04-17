import { EventEmitter, Component, AfterViewInit, PLATFORM_ID ,Inject, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LeafletData } from '../leaflet-data';
import { Address} from 'ign-geos-completion-swagger-client'
import { ParcelleService } from 'api-cadastre-parcelle'
import { Geometry } from 'api-cadastre-parcelle';
import * as L from 'leaflet';
import { Polygon } from 'geojson';


@Component({
  selector: 'app-leaflet-map',
  imports: [],  
  providers: [ParcelleService],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;

  markers!: L.Marker[];
  _selectedAddress!:Address|undefined;
  @Output() leafletEvent:EventEmitter<LeafletData> = new EventEmitter<LeafletData>();
  mapData!:LeafletData;

  constructor(private readonly parcelleService:ParcelleService, @Inject(PLATFORM_ID) private platformId: any) {}
  
  @Input() 
  set selectedAddress(value:Address|undefined){
    console.log("Leaflet has just received a new address"+JSON.stringify(value));
    this._selectedAddress=value;
    if(this._selectedAddress && !this.map){
      this.initMap();    
    }
    if(this._selectedAddress){
      this.centerMap();    
    }    
  }

  
  
  publishLeafletData(){    
    this.leafletEvent.emit(this.mapData);
  }
  
  

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      //this.initMap();
    }
  }

  async initMap() {    
    if(this._selectedAddress){
      console.info("Map init...");
      const L = await import('leaflet');
      this.map = L.map('map').setView([this._selectedAddress.y, this._selectedAddress.x], 50);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  }



  async centerMap() {    
    if(this._selectedAddress && this.map){
      const L = await import('leaflet');
      //const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));          
      //const bounds = L.latLngBounds([new L.LatLng(this._selectedAddress.y, this._selectedAddress.x)]);
       var bounds = L.latLngBounds([
                                      [this._selectedAddress.y, this._selectedAddress.x],
                                      [this._selectedAddress.y, this._selectedAddress.x]
                                    ]); // Define bounds with the same coordinates
       this.map.fitBounds(bounds);    
       this.loadConstructions();
    }
  }

  loadConstructions(){
    // const squareCoord:number[][]=[[
    //           2.61360218606151,
    //           48.7961162875869
    //       ],
    //       [
    //           2.61360218606151,
    //           48.7939617237299
    //       ],
    //       [
    //           2.61718441667952,
    //           48.7939617237299
    //       ],
    //       [
    //           2.61718441667952,
    //           48.7961162875869
    //       ],
    //       [
    //           2.61360218606151,
    //           48.7961162875869
    //       ]];
    if(this._selectedAddress){
      // 1deg x deg a paris = 111.111 lat x 69.17 lng
      // lat 0.009000000 = 1m
      // lng 0.014457134 = 1m
      const squareSide = 10;//10m
      const ydiff:number = 0.009000000*squareSide;
      const xdiff:number = 0.014457134*squareSide;
      let centerx= this._selectedAddress.x;
      let centery= this._selectedAddress.y;
      const nw = [centerx - xdiff/2,centery + ydiff/2];
      const ne = [centerx + xdiff/2,centery + ydiff/2];
      const se = [centerx + xdiff/2,centery - ydiff/2];
      const sw = [centerx - xdiff/2,centery - ydiff/2];

      let geometry:Geometry={
            type: 'Polygon',
            coordinates: [
              [
                  nw,sw,se,ne,nw
              ]
            ],
          };
      
      this.parcelleService.getParcelle(undefined,undefined,undefined,undefined,undefined,geometry,undefined,undefined,undefined,undefined,undefined)
      .subscribe({
        next: item1=>console.log("received "+JSON.stringify(item1)),
        error:err=>console.error(err),
        complete:()=>console.info("end")
      })
      
    }
  }



  /* api cadastre parcelle 

{
    "coordinates": [
        [
            [
                2.61360218606151,
                48.7961162875869
            ],
            [
                2.61360218606151,
                48.7939617237299
            ],
            [
                2.61718441667952,
                48.7939617237299
            ],
            [
                2.61718441667952,
                48.7961162875869
            ],
            [
                2.61360218606151,
                48.7961162875869
            ]
        ]
    ],
    "type": "Polygon"
}  
  
  */
  
}