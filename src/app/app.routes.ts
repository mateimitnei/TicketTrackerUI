import { Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tickets', pathMatch: 'full' },
    { path: 'tickets', component: TicketListComponent },
    { path: 'tickets/:ticketKey', component: TicketDetailsComponent }
];
