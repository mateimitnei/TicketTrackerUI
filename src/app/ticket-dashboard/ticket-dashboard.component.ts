import { Component } from '@angular/core';
import { StatusLabelPipe } from '../pipes/statusLabel.pipe';
import { RouterLink } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-ticket-dashboard',
    imports: [StatusLabelPipe, RouterLink],
    templateUrl: './ticket-dashboard.component.html',
    styleUrl: './ticket-dashboard.component.css',
})
export class TicketDashboardComponent {
    ticketsCount : number[];
    allCount : number;

    constructor(private ticketService: TicketService) {
        this.ticketsCount = this.ticketService.getTicketsCountByStatus();
        this.allCount = this.ticketsCount.reduce((sum, count) => sum + count, 0);
    }

    setFilter(statusId: number) {
        this.ticketService.updateFilter(statusId);
    }
}
