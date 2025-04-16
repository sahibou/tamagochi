import { Component, OnInit, AfterViewInit, PLATFORM_ID ,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
   private map!: L.Map
   markers!: L.Marker[];

   constructor(@Inject(PLATFORM_ID) private platformId: any) {}


  ngOnInit() {
  }

  // ngAfterViewInit() {
  //   this.initMap();
  //   this.centerMap();
  // }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  async initMap() {
    const L = await import('leaflet');
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.markers = [
      L.marker([23.7771, 90.3994]) // Dhaka, Bangladesh
    ];
  }

  // private initMap() {
    // const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // this.map = L.map('map');
    // L.tileLayer(baseMapURl).addTo(this.map);
  // }


  // private centerMap() {
    // Create a boundary based on the markers
    // const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // // Fit the map into the boundary
    // this.map.fitBounds(bounds);
  // }
}