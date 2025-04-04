// Import Angular's browser platform bootstrapping utilities
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Import the root module of our application
import { AppModule } from './app/app.module';

// Bootstrap the application with the AppModule
platformBrowserDynamic()
  .bootstrapModule(AppModule)  // Initialize the root module
  .catch(err => console.error(err));  // Handle any bootstrap errors
