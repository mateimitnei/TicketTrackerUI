import { Injectable } from '@angular/core';
import { ITicket } from '../ticket.model';
import { IAudit } from '../audit.model';
import { delay, Observable, of } from 'rxjs';

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
            statusId: 4,
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

    private auditLog : IAudit[] = [
        {
            id: 1,
            ticketId: 1,
            ticketKey: 'TK-114',
            ticketTitle: 'Sample Ticket',
            ticketDescription: 'This is the first mock ticket ever created for this frontend project.',
            ticketCreatedAt: new Date(),
            ticketStatusId: 1,
            ticketPriorityId: 2,
            changedAt: new Date(),
            changeType: 'created'
        },
        {
            id: 2,
            ticketId: 1,
            ticketKey: 'TK-114',
            ticketTitle: 'Sample Ticket',
            ticketDescription: 'This is the first mock ticket ever created for this frontend project.',
            ticketCreatedAt: new Date(),
            ticketStatusId: 2,
            ticketPriorityId: 2,
            changedAt: new Date(),
            changeType: 'status'
        },
        {
            id: 3,
            ticketId: 1,
            ticketKey: 'TK-114',
            ticketTitle: 'Sample Ticket',
            ticketDescription: 'This is the first mock ticket ever created for this frontend project.',
            ticketCreatedAt: new Date(),
            ticketStatusId: 3,
            ticketPriorityId: 2,
            changedAt: new Date(),
            changeType: 'status'
        },
        {
            id: 4,
            ticketId: 2,
            ticketKey: 'TK-115',
            ticketTitle: 'Ssample Ticket',
            ticketDescription: 'This is the second mock ticket ever created for this frontend project.',
            ticketCreatedAt: new Date(),
            ticketStatusId: 1,
            ticketPriorityId: 1,
            changedAt: new Date(),
            changeType: 'created'
        }
    ]

    private newId: number = this.tickets.length + 1;
    private newKeyNumber: number = 114 + this.tickets.length;

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

    addTicket(formValues: any) {
        const newTicket: ITicket = {
            id: this.newId,
            ticketKey: `TK-${this.newKeyNumber}`,
            title: formValues.title,
            description: formValues.description,
            createdAt: new Date(),
            statusId: 1,
            priorityId: formValues.priorityId
        };
        this.tickets.push(newTicket);
        this.newId++;
        this.newKeyNumber++;
    }

    deleteTicketById(id: number) {
        this.tickets = this.tickets.filter(t => t.id !== id);
    }

    getTicketByKey(key: string | undefined): ITicket | undefined {
        return this.tickets.find(ticket => ticket.ticketKey === key);
    }

    getAuditForTicket(key: string): Observable<IAudit[]> {
        return of(this.auditLog.filter(audit => audit.ticketKey === key)).pipe(delay(1000));
    }
}
