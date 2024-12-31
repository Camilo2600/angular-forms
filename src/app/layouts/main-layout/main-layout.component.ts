import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
    imports: [RouterOutlet],
  template: `

    <main>
      <router-outlet></router-outlet>
    </main>

  `,
  styles: [
    `
      header {
        background: #black;
        color: white;
        padding: 1rem;
      }
      footer {
        background: #333;
        color: white;
        padding: 1rem;
        text-align: center;
      }
    `
  ]
})
export class MainLayoutComponent {}
