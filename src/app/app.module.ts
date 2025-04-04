// Core Angular modules for basic functionality
import { CommonModule } from '@angular/common'; // Provides common directives and pipes
import { HttpClientModule } from '@angular/common/http'; // For making HTTP requests
import { NgModule } from '@angular/core'; // Core decorator for Angular modules
import { BrowserModule } from '@angular/platform-browser'; // Essential browser-specific services
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Enables animations

// Firebase authentication modules
import { AngularFireModule } from '@angular/fire/compat'; // Firebase core functionality
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Firebase authentication

// NgRx state management modules
import { EffectsModule } from '@ngrx/effects'; // Handles side effects in NgRx
import { StoreModule } from '@ngrx/store'; // Core NgRx store functionality

// Environment configuration
import { environment } from '../env/env.dev'; // Development environment settings

// Application modules and components
import { AppRoutingModule } from './app-routing.module'; // Main routing configuration
import { AppComponent } from './app.component'; // Root component
import { AppShellModule } from './core/app-shell/app-shell.module'; // App shell features
import { AuthModule } from './core/auth/auth.module'; // Authentication module
import { AuthEffect } from './core/auth/state/auth.effects'; // Authentication effects
import { authReducer } from './core/auth/state/auth.reducers'; // Authentication reducer
import { HomeModule } from './features/home-page/home.module'; // Home page feature
import { ProductListingModule } from './features/product-listing/product-listing.module'; // Product listing feature

// Main application module configuration
@NgModule({
  declarations: [
    AppComponent  // Declares the root component
  ],
  imports: [
    // Angular core modules
    BrowserModule,  // Essential for browser-based apps
    BrowserAnimationsModule,  // Enables animation features
    CommonModule,  // Common directives and pipes
    HttpClientModule,  // HTTP client for API calls
    
    // Application feature modules
    AppRoutingModule,  // Main routing configuration
    ProductListingModule,  // Product listing feature
    AuthModule,  // Authentication feature
    HomeModule,  // Home page feature
    AppShellModule,  // App shell components
    
    // NgRx store configuration
    StoreModule.forRoot({ auth: authReducer }),  // Sets up NgRx store with auth reducer
    EffectsModule.forRoot([AuthEffect]),  // Configures NgRx effects
    
    // Firebase configuration
    AngularFireModule.initializeApp(environment.firebase),  // Initializes Firebase
    AngularFireAuthModule  // Firebase authentication services
  ],
  bootstrap: [AppComponent]  // Specifies the root component to bootstrap
})
export class AppModule { }  // Root module of the application
