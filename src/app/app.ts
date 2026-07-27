import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketListComponent } from "./ticket-list/ticket-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-exercises');
}
