import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-card',
  imports: [],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})
export class TicketCardComponent {
  id : number = 3;
  ticketKey : string = 'TK-114';
  title : string = 'Sample Ticket';
  description : string = 'This is the first mock ticket ever created for this frontend project.';
  createdAt : Date = new Date();
  statusId : number = 1;
  priorityId : number = 2;
}
