import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITicket } from '../ticket.model';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '../pipes/statusLabel.pipe';
import { PriorityLabelPipe } from '../pipes/priorityLabel';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule, StatusLabelPipe, PriorityLabelPipe, RouterLink],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})

export class TicketCardComponent {
  @Input() ticket!: ITicket;

  @Output() delete = new EventEmitter<number>();

  deleteTicket() {
    this.delete.emit(this.ticket.id);
  }
}
