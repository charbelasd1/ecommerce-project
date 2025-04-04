// Core Angular imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Material Design imports for UI components
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Shell components imports
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ShellComponent } from './shell/shell.component';

/**
 * AppShellModule provides the main application shell structure including
 * navigation, footer, and the main container layout.
 * It uses Material Design components for a modern, responsive UI.
 */
@NgModule({
  // Components that belong to the shell module
  declarations: [
    NavComponent,      // Main navigation bar
    FooterComponent,   // Application footer
    ShellComponent    // Main shell container
  ],
  // Required modules for functionality
  imports: [
    CommonModule,      // Angular common directives and pipes
    RouterModule,      // For navigation and routing
    MatIconModule,     // Material icons
    MatButtonModule,   // Material buttons
    MatMenuModule,     // Material dropdown menus
    MatDividerModule, // Material dividers
    MatBadgeModule    // Material badges (e.g., for cart items)
  ],
  // Expose ShellComponent for use in other modules
  exports: [
    ShellComponent     // Main shell container for the application
  ]
})
export class AppShellModule { }