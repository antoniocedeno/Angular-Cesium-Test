import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularCesiumModule } from 'angular-cesium';
import { MapComponent } from './map.component';
import { BoxesLayerComponent } from './boxes-layer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    BoxesLayerComponent
  ],
  imports: [
    BrowserModule,
    AngularCesiumModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
