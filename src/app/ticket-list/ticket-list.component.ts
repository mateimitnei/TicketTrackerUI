import { Component } from '@angular/core';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { FormsModule } from '@angular/forms';
import { ITicket } from '../ticket.model';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketCardComponent, FormsModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})

export class TicketListComponent {
  searchText: string = '';
  newTicketTitle: string = '';
  newTicketPriorityId: number = 0;
  tickets : ITicket[] = [
    {
      id: 1,
      ticketKey: 'TK-114',
      title: 'Sample Ticket',
      description: 'This is the first mock ticket ever created for this frontend project.',
      createdAt: new Date(),
      statusId: 1,
      priorityId: 2
    },
    {
      id: 2,
      ticketKey: 'TK-115',
      title: 'Ssample Ticket',
      description: 'This is the second mock ticket ever created for this frontend project.',
      createdAt: new Date(),
      statusId: 2,
      priorityId: 1
    },
    {
      id: 3,
      ticketKey: 'TK-116',
      title: 'Sample Ticcket',
      description: 'This is the third mock ticket ever created for this frontend project.',
      createdAt: new Date(),
      statusId: 3,
      priorityId: 3
    },
    {
      id: 4,
      ticketKey: 'TK-117',
      title: 'Sample Tickett',
      description: 'This is the fourth mock ticket ever created for this frontend project.',
      createdAt: new Date(),
      statusId: 1,
      priorityId: 2
    },
    {
      id: 5,
      ticketKey: 'TK-118',
      title: 'Sammple Ticket',
      description: 'This is the fifth mock ticket ever created for this frontend project.',
      createdAt: new Date(),
      statusId: 2,
      priorityId: 1
    },
    {
      id: 6,
      ticketKey: 'TK-119',
      title: 'Ssammple Ticckett',
      description: 'This is the sixth mock ticket ever created for this frontend project.',
      createdAt: new Date(),
      statusId: 3,
      priorityId: 3
    }
  ]

  get filteredTickets() {
    if (!this.searchText) {
      return this.tickets;
    }

    return this.tickets.filter(
      ticket => ticket.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addTicket() {
    if (this.newTicketTitle.trim() === '' || this.newTicketPriorityId === 0) {
      return;
    }
    const newTicket = {
      id: this.tickets.length + 1,
      ticketKey: `TK-${114 + this.tickets.length}`,
      title: this.newTicketTitle,
      description: `User created a ticket after clicking the "Add Ticket" button.`,
      createdAt: new Date(),
      statusId: 1,
      priorityId: this.newTicketPriorityId
    };

    this.tickets = [newTicket, ...this.tickets];
    this.newTicketTitle = '';
    this.newTicketPriorityId = 0;
  }

  deleteTicketById(ticketId: number) {
    this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
  }
}
