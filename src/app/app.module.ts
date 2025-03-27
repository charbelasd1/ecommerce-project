import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../env/env.dev';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListingModule } from './features/product-listing/product-listing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './core/auth/state/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './core/auth/state/auth.effects';
import { AuthModule } from './core/auth/auth.module';
import { HomeModule } from './features/home-page/home.module';
import { AppShellModule } from './core/app-shell/app-shell.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ProductListingModule,
    AuthModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffect]),
    HomeModule,
    AppShellModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
