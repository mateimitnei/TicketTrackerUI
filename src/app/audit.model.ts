export interface IAudit {
    id: number;
    ticketId: number;
    ticketKey: string;
    ticketTitle: string;
    ticketDescription: string;
    ticketCreatedAt: Date;
    ticketStatusId: number;
    ticketPriorityId: number;
    changedAt: Date;
    changeType: string;
}