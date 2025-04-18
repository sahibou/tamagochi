import { EventEmitter, Component, AfterViewInit, PLATFORM_ID ,Inject, Input, Output, ɵɵqueryRefresh } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LeafletData } from '../leaflet-data';
import { Address} from 'ign-geos-completion-swagger-client'
import { ParcelleService } from 'api-cadastre-parcelle'
import { Geometry } from 'api-cadastre-parcelle';
import { FeatureCollection } from 'api-cadastre-parcelle';
import { Feature } from 'geojson';
import { ConstructionObject } from '../construction-object';
import * as L from 'leaflet';

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
  _receivedFeatureCollection!:FeatureCollection;
  _aliveConstructionObject:L.Layer[]=[];
  _selectedParcelId:string='';
  

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
          this._receivedFeatureCollection=featureCollection;
          for(const f of featureCollection.features){
            this.addFeatureToMap(f,this._selectedParcelId);
          }
        },
        error:err=>console.error(err)
      })
      
    }

    
  }

  stylea:{}={color: "#0000ff"};
  styleb:{}={color: "#ff0000"};

  async addFeatureToMap(f:Feature, selectedParcelId:string){
    const L = await import('leaflet');
    let xxx:L.Layer = L.geoJSON(f,
      {
        style: f.id===selectedParcelId?this.stylea:this.styleb,
        onEachFeature: (f, layer)=> {
          layer.on('click', this.fn)
        }
      }
      ).addTo(this.map);
    
    
    this._aliveConstructionObject.push(xxx);
  }

  //LeafletEventHandlerFn = (event: LeafletEvent) => void;
  fn = (event: L.LeafletEvent) =>{
    let newParcelId:string = event.target.feature.id;
    let oldParcelId:string = this._selectedParcelId;
    this._selectedParcelId= newParcelId;
    this._aliveConstructionObject.forEach(l=>this.map.removeLayer(l));
    this.selectedAddress=this._selectedAddress;//call setter
    
    console.log(event);
    // let newParcelId:string = event.target.feature.id;
    // let oldParcelId:string = this._selectedParcelId;
    // this._selectedParcelId= newParcelId;
    // //rebuild old
    // let featureOld:Feature|undefined = this.getSavedFeature(newParcelId);
    // this.map.removeLayer(event.target);//Removes the layer with the given internal ID or the given layer from the group.
    // if(featureOld!=undefined){
    //   this.addFeatureToMap(featureOld,oldParcelId);
    // }

    // //rebuild new
    // let featureNew:Feature|undefined = this.getSavedFeature(oldParcelId);
    // this.map.removeLayer(event.target);
    // if(featureNew!=undefined){
    //   this.addFeatureToMap(featureNew,newParcelId);
    // }
  }

  // getSavedFeature(parcelId:string):Feature|undefined{
  //   // console.log(this._aliveConstructionObject);
  //   console.log(this.map);
  //   let featureArray:Feature[] = (this._receivedFeatureCollection.features as Feature[]);
  //   let feature = featureArray.find(feat=>feat.id===parcelId);
  //   return feature;
  // }
}