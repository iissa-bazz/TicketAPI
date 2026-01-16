export type Status = "open" | "in_progress" | "closed";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: Status;
    created_at: string;
}