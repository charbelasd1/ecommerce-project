import { Component } from '@angular/core';

/**
 * FooterComponent serves as the main footer section of the application shell.
 * It is rendered at the bottom of every page through the ShellComponent.
 *
 * Features:
 * - Displays consistent footer content across all pages
 * - Part of the app-shell module's layout structure
 * - Styled using SCSS for maintainable and modular CSS
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // Footer component is currently stateless
  // Add properties and methods here if footer functionality needs to be extended
}
