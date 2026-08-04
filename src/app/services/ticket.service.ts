import { Injectable } from '@angular/core';
import { ITicket } from '../ticket.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets : ITicket[] = [
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

  getTickets(): Observable<ITicket[]> {
    return of(this.tickets);
  }

  getLength(): number {
    return this.tickets.length;
  }

  searchTickets(searchText: string): Observable<ITicket[]> {
    const filteredTickets = this.tickets.filter(ticket => 
      ticket.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return of(filteredTickets);
  }

  addTicket(ticket: ITicket) {
    this.tickets.push(ticket);
  }

  deleteTicketById(id: number) {
    this.tickets = this.tickets.filter(t => t.id !== id);
  }

  getTicketByKey(key: string | undefined): ITicket | undefined {
    return this.tickets.find(ticket => ticket.ticketKey === key);
  }
}
