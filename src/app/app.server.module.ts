import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapNgFactoryLoader } from "@nguniversal/module-map-ngfactory-loader";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapNgFactoryLoader
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
