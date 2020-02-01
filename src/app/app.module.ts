import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatCheckboxModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    routingComponents,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
     MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
