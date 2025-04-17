import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ApiModule as ApiModuleIgn, Configuration as ConfigurationIgn} from 'ign-geos-completion-swagger-client';
import {ApiModule as ApiModuleCadastre, Configuration as ConfigurationCadastre} from 'api-cadastre-parcelle';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
      importProvidersFrom( HttpClientModule,
        ApiModuleIgn.forRoot(()=>new ConfigurationIgn({
                              apiKeys:undefined,//apiKeys?: {[ key: string ]: string};
                              username:undefined,//username?: string;
                              password:undefined,//password?: string;
                              accessToken:undefined,//accessToken?: string | (() => string);
                              basePath:"https://data.geopf.fr/geocodage/completion",//basePath?: string;
                              withCredentials:false//withCredentials?: boolean;
                            })
                          ),
          ApiModuleCadastre.forRoot(()=>new ConfigurationCadastre({
                            apiKeys:undefined,//apiKeys?: {[ key: string ]: string};
                            username:undefined,//username?: string;
                            password:undefined,//password?: string;
                            accessToken:undefined,//accessToken?: string | (() => string);
                            basePath:"https://apicarto.ign.fr",//basePath?: string;
                            withCredentials:false//withCredentials?: boolean;
                          })
            ),
        
      )
  ]
};
