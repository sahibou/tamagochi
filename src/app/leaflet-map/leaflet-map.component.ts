import { EventEmitter, Component, AfterViewInit, PLATFORM_ID ,Inject, Input, Output, ɵɵqueryRefresh } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LeafletData } from '../leaflet-data';
import { Address} from 'ign-geos-completion-swagger-client'
import { ParcelleService } from 'api-cadastre-parcelle'
import { Geometry } from 'api-cadastre-parcelle';
import * as L from 'leaflet';
import { FeatureCollection } from 'api-cadastre-parcelle';
import { Feature } from 'geojson';

@Component({
  selector: 'app-leaflet-map',
  imports: [],  
  providers: [ParcelleService],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;
  private geojsonLayer!:L.Layer;

  markers!: L.Marker[];
  _selectedAddress!:Address|undefined;
  @Output() leafletEvent:EventEmitter<LeafletData> = new EventEmitter<LeafletData>();
  mapData!:LeafletData;
  parcelleCollection!:FeatureCollection;
  mapFeatures:any[]=[];
  selectedParcelId:string='';
  

  constructor(private readonly parcelleService:ParcelleService, @Inject(PLATFORM_ID) private platformId: any) {}
  
  @Input() 
  set selectedAddress(value:Address|undefined){
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
      const L = await import('leaflet');
      this.map = L.map('map').setView([this._selectedAddress.y, this._selectedAddress.x], 50);
      this.geojsonLayer = L.geoJSON().addTo(this.map);

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
       let bounds = L.latLngBounds([
                                      [this._selectedAddress.y, this._selectedAddress.x],
                                      [this._selectedAddress.y, this._selectedAddress.x]
                                    ]); // Define bounds with the same coordinates
       this.map.fitBounds(bounds);    
       this.loadConstructions();
    }
  }

  async loadConstructions(){
    if(this._selectedAddress){
      // 1deg x deg a paris = 111.111 lat x 69.17 lng
      // lat 0.009000000 = 1m
      // lng 0.00000173 = 1m
      const squareSide = 50;//10m
      const ydiff:number = 0.00000898315 *squareSide;
      const xdiff:number = 0.000012356 *squareSide;
      let centerx= this._selectedAddress.x;
      let centery= this._selectedAddress.y;
      const nw = [centerx - xdiff/2,centery + ydiff/2];
      const ne = [centerx + xdiff/2,centery + ydiff/2];
      const se = [centerx + xdiff/2,centery - ydiff/2];
      const sw = [centerx - xdiff/2,centery - ydiff/2];

      const L = await import('leaflet');
      let geometry:Geometry={
            type: 'Polygon',
            coordinates: [[nw,sw,se,ne,nw]],
          };
      
      this.parcelleService.getParcelle(undefined,undefined,undefined,undefined,undefined,geometry,10,undefined,undefined,undefined,undefined)
      .subscribe({
        next: featureCollection=>{
    
          // this.map.;
          //let myLayer = L.geoJSON().addTo(this.map);
          this.parcelleCollection=featureCollection;
          for(const f of featureCollection.features){
            this.fromFeatureToLeaflet(f);
          }
        },
        error:err=>console.error(err)
      })
      
    }

    
  }

  stylea:{}={color: "#0000ff"};
  styleb:{}={color: "#ff0000"};

  async fromFeatureToLeaflet(f:Feature){
    const L = await import('leaflet');
    console.warn(f);
    this.mapFeatures.push(L.geoJSON(f,{
      style: f.id===this.selectedParcelId?this.stylea:this.styleb,
      onEachFeature: (f, layer)=> {
        layer.on('click', this.fn)
      }
    }).addTo(this.map));
  }

  //LeafletEventHandlerFn = (event: LeafletEvent) => void;
  fn = (event: L.LeafletEvent) =>{
    this.selectedParcelId= event.target.feature.id;
    // let condamne = this.mapFeatures.find(f=>f.target.feature.id===this.selectedParcelId);//(this.geojsonLayer);
    // this.map.removeLayer(condamne);
    // this.mapFeatures=this.mapFeatures.filter(f=>f.target.feature.id!==this.selectedParcelId);
    this.map.removeLayer(this.geojsonLayer);
    this.selectedAddress=this._selectedAddress;//call setter
  }
  
}