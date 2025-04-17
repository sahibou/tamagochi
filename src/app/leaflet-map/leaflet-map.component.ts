import { EventEmitter, Component, AfterViewInit, PLATFORM_ID ,Inject, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LeafletData } from '../leaflet-data';
import { Address} from 'ign-geos-completion-swagger-client'
import * as L from 'leaflet';


@Component({
  selector: 'app-leaflet-map',
  imports: [],  
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;

  markers!: L.Marker[];
  _selectedAddress!:Address|undefined;
  @Output() leafletEvent:EventEmitter<LeafletData> = new EventEmitter<LeafletData>();
  mapData!:LeafletData;

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

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  
  publishLeafletData(){    
    this.leafletEvent.emit(this.mapData);
  }
  // ngAfterViewInit() {
  //   this.initMap();
  //   this.centerMap();
  // }

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
    }
  }
}