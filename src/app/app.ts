import { Component, signal } from '@angular/core';
import { UserStorie } from './user-storie/user-storie';

@Component({
  selector: 'app-root',
  imports: [UserStorie],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dev-angular');
}
