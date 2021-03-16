import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { DetailsComponent } from './details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { AgGridModule } from 'ag-grid-angular';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';







@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DetailsComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
     BrowserAnimationsModule, 
     MatToolbarModule,
     MatIconModule,
     MatButtonModule,
     MatGridListModule,
     MatExpansionModule,
     AgGridModule.withComponents([]),
     LayoutModule,
     MatSidenavModule,
     MatListModule,
     MatSelectModule,
     FormsModule,
     ReactiveFormsModule,
     
     
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
