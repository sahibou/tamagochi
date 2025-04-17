import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CommuneService } from './api/commune.service';
import { DivisionBDParcellaireService } from './api/divisionBDParcellaire.service';
import { FeuillePCIEXPRESSService } from './api/feuillePCIEXPRESS.service';
import { LocalisantService } from './api/localisant.service';
import { ParcelleService } from './api/parcelle.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CommuneService,
    DivisionBDParcellaireService,
    FeuillePCIEXPRESSService,
    LocalisantService,
    ParcelleService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
