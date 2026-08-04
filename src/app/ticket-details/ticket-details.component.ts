import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { ITicket } from '../ticket.model';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '../pipes/statusLabel.pipe';
import { PriorityLabelPipe } from '../pipes/priorityLabel';

@Component({
  selector: 'app-ticket-details',
  imports: [CommonModule, StatusLabelPipe, PriorityLabelPipe, RouterLink],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {
  key: string | undefined;
  ticket: ITicket | undefined;

  constructor(private ticketService: TicketService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.key = this.route.snapshot.params['ticketKey'];
    if (this.key) {
      this.ticket = this.ticketService.getTicketByKey(this.key);
    }
  }

  deleteTicket() {
    this.ticketService.deleteTicketById(this.ticket!.id);
  }
}
