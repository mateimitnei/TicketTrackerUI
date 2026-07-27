import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketCardComponent } from './ticket-card/ticket-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-exercises');
}
