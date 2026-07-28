import { Component } from '@angular/core';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})

export class TicketListComponent {
  displayedTickets: any[];
  tickets = [
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

  constructor() {
    this.displayedTickets = this.tickets;
  }

  toggleTickets() {
    if (this.displayedTickets.length === 0) {
      this.displayedTickets = this.tickets;
    } else {
      this.displayedTickets = [];
    }
  }
}
