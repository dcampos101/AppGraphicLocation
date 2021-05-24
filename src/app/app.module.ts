import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatInputModule, MatPaginatorModule, MatTableModule,  MatSortModule, MatPaginatorIntl } from '@angular/material/table';';

@NgModule({
  declarations: [
    AppComponent, 
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
