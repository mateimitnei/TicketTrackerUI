import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { ITicket } from '../ticket.model';
import { IAudit } from '../audit.model';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '../pipes/statusLabel.pipe';
import { PriorityLabelPipe } from '../pipes/priorityLabel';
import { Subscription, map } from 'rxjs';

@Component({
    selector: 'app-ticket-details',
    imports: [CommonModule, StatusLabelPipe, PriorityLabelPipe, RouterLink],
    templateUrl: './ticket-details.component.html',
    styleUrl: './ticket-details.component.css'
})

export class TicketDetailsComponent {
    key: string | undefined;
    ticket: ITicket | undefined;
    audits: IAudit[] = [];
    loadingAudits = signal<boolean>(true);
    private auditsSubscription!: Subscription;

    constructor(private ticketService: TicketService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.key = this.route.snapshot.params['ticketKey'];

        if (this.key) {
            this.ticket = this.ticketService.getTicketByKey(this.key);
            
            this.auditsSubscription = this.ticketService.getAuditForTicket(this.key)
                .pipe(map(audits => audits.filter(audit => audit.changeType === 'status')))
                .subscribe(filteredAudits => {
                    this.audits = filteredAudits;
                    this.loadingAudits.set(false);
                }
            );
        }
    }

    deleteTicket() {
        this.ticketService.deleteTicketById(this.ticket!.id);
    }

    ngOnDestroy() {
    if (this.auditsSubscription) {
        this.auditsSubscription.unsubscribe();
    }
  }
}
