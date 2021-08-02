import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    AgGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



