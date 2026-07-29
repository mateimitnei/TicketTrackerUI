export interface ITicket {
  id: number;
  ticketKey: string;
  title: string;
  description: string;
  createdAt: Date;
  statusId: number;
  priorityId: number;
}