import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITicket } from '../ticket.model';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '../pipes/statusLabel.pipe';
import { PriorityLabelPipe } from '../pipes/priorityLabel';

@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule, StatusLabelPipe, PriorityLabelPipe],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})

export class TicketCardComponent {
  @Input() ticket: ITicket = {
    id: 0,
    ticketKey: '',
    title: 'Dummy Ticket',
    description: 'No data.',
    createdAt: new Date(),
    statusId: 0,
    priorityId: 0
  };

  @Output() delete = new EventEmitter<number>();

  deleteTicket() {
    this.delete.emit(this.ticket.id);
  }
}
