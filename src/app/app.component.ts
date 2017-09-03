import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h2>{{title}}</h2>
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}
