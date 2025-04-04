import { Component } from '@angular/core';

/**
 * ShellComponent serves as the main container and layout component for the application.
 * It provides the basic structure that wraps all other components and pages.
 *
 * Layout Structure:
 * - Navigation bar at the top (app-nav)
 * - Main content area with router-outlet for dynamic content
 * - Footer at the bottom (app-footer)
 *
 * This component is the only component exported by the AppShellModule,
 * making it the main entry point for the application's shell structure.
 */
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  // Shell component is primarily a container component
  // It manages the overall layout structure but delegates specific functionality
  // to its child components (nav and footer)
}
