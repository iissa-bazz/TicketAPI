export type Status = "open" | "in_progress" | "closed";

export type TicketInputs = {
  title: string;
  description: string;
  status: Status;
};
export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: Status;
    created_at: string;
}
