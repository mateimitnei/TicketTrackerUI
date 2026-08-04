import { Component } from '@angular/core';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ITicket } from '../ticket.model';
import { TicketService } from '../services/ticket.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-ticket-list',
    imports: [TicketCardComponent, FormsModule, AsyncPipe, ReactiveFormsModule],
    templateUrl: './ticket-list.component.html',
    styleUrl: './ticket-list.component.css',
})

export class TicketListComponent {
    searchText: string = '';
    newTicketTitle: string = '';
    newTicketPriorityId: number = 0;

    ticketsObs!: Observable<ITicket[]>;

    ticketForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        priorityId: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(3)]),
        description: new FormControl('', [Validators.maxLength(1000)])
    });
    pressedSubmit: boolean = false;
    
    constructor(private ticketService: TicketService) {}

    ngOnInit() {
        this.ticketsObs = this.ticketService.getTickets();
    }

    onSearch() {
        if (!this.searchText) {
            this.ticketsObs = this.ticketService.getTickets();
        } else {
            this.ticketsObs = this.ticketService.searchTickets(this.searchText);
        }
    }

    addTicket() {
        this.pressedSubmit = true;
        if (this.ticketForm.invalid) {
            this.ticketForm.markAllAsTouched(); 
            return; 
        }

        this.ticketService.addTicket(this.ticketForm.value);
        this.onSearch(); // update ticket list (keeping the search filter)
        this.ticketForm.reset({title: '', priorityId: 0, description: ''});
        this.pressedSubmit = false;
    }

    deleteTicketById(ticketId: number) {
        this.ticketService.deleteTicketById(ticketId);
        this.onSearch(); // update ticket list
    }
}
