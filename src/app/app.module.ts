import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlateauComponent } from './components/plateau/plateau.component';
import { FormsModule } from '@angular/forms';
import { MarsComponent } from './components/mars/mars.component';

@NgModule({
  declarations: [
    AppComponent,
    PlateauComponent,
    MarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
