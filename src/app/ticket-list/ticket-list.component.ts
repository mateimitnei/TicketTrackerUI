import { Component } from '@angular/core';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ITicket } from '../ticket.model';
import { TicketService } from '../services/ticket.service';
import { combineLatest, Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-ticket-list',
    imports: [TicketCardComponent, FormsModule, AsyncPipe, ReactiveFormsModule, RouterLink],
    templateUrl: './ticket-list.component.html',
    styleUrl: './ticket-list.component.css',
})

export class TicketListComponent {
    searchText: string = '';
    newTicketTitle: string = '';
    newTicketPriorityId: number = 0;

    filteredTicketsObs!: Observable<ITicket[]>;

    ticketForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        priorityId: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(3)]),
        description: new FormControl('', [Validators.maxLength(1000)])
    });
    pressedSubmit: boolean = false;
    
    
    constructor(private ticketService: TicketService) {
        
    }

    private filterTickets() : Observable<ITicket[]> {
        const ticketsObs = this.ticketService.getTickets();
        const filterObs = this.ticketService.getFilter();
        return combineLatest([ticketsObs, filterObs])
            .pipe(map(([tickets, filter]) => {
                if (filter === 0) {
                    return tickets;
                }
                return tickets.filter(ticket => ticket.statusId === filter);
            }));
    }

    ngOnInit() {
        this.filteredTicketsObs = this.filterTickets();
    }

    displayTickets() {
        if (this.searchText.trim() === '') {
            this.filteredTicketsObs = this.filterTickets();
        } else {
            this.filteredTicketsObs = this.filteredTicketsObs.pipe(
                map(tickets => tickets.filter(ticket => 
                    ticket.title.toLowerCase().includes(this.searchText.toLowerCase())))
            );
        }
    }

    addTicket() {
        this.pressedSubmit = true;
        if (this.ticketForm.invalid) {
            this.ticketForm.markAllAsTouched(); 
            return; 
        }

        this.ticketService.addTicket(this.ticketForm.value);
        this.displayTickets(); // update ticket list (keeping the search filter)
        this.ticketForm.reset({title: '', priorityId: 0, description: ''});
        this.pressedSubmit = false;
    }

    deleteTicketById(ticketId: number) {
        this.ticketService.deleteTicketById(ticketId);
        this.displayTickets(); // update ticket list
    }
}
