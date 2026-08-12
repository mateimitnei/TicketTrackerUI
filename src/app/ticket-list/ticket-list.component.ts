import { Component } from '@angular/core';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { FormsModule } from '@angular/forms';
import { ITicket } from '../ticket.model';
import { TicketService } from '../services/ticket.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketCardComponent, FormsModule, AsyncPipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})

export class TicketListComponent {
  searchText: string = '';
  newTicketTitle: string = '';
  newTicketPriorityId: number = 0;
  ticketsObs: Observable<ITicket[]> | undefined;
  
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketsObs = this.ticketService.getTickets();
  }

  onSearch(): void {
    if (!this.searchText) {
      this.ticketsObs = this.ticketService.getTickets();
    } else {
      this.ticketsObs = this.ticketService.getTickets().pipe(
        map(tickets => tickets.filter(ticket => 
          ticket.title.toLowerCase().includes(this.searchText.toLowerCase())
        ))
      );
    }
  }

  addTicket() {
    if (this.newTicketTitle.trim() === '' || this.newTicketPriorityId === 0) {
      return;
    }
    const newTicket = {
      id: this.ticketService.getLength() + 1,
      ticketKey: `TK-${114 + this.ticketService.getLength()}`,
      title: this.newTicketTitle,
      description: `User created a ticket after clicking the "Add Ticket" button.`,
      createdAt: new Date(),
      statusId: 1,
      priorityId: this.newTicketPriorityId
    };

    this.ticketService.addTicket(newTicket);
    this.onSearch(); // update ticket list (keeping the search filter)
    this.newTicketTitle = '';
    this.newTicketPriorityId = 0;
  }

  deleteTicketById(ticketId: number) {
    this.ticketService.deleteTicketById(ticketId);
    this.onSearch(); // update ticket list
  }
}
