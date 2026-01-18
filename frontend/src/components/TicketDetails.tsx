import { Link, useParams} from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Modal from './Modal';
import TicketData from '../assets/tickets.json';
import type { Ticket } from '../types';

// LATER: Replace with API call
const fetchTicketById = async (id: string | undefined, currentCache: Ticket[] | undefined) => {
    console.log("Fetching ticket id: " + id);
    await new Promise((r) => setTimeout(r, 5000)); // Simulate API delay
    return TicketData.find(t => t.id === id)        // Hardcoded data
            || currentCache?.find(t => t.id === id) // Fallback to cache
            || null;
};

export default function TicketDetails() {
    // Get ticket ID from URL parameters
    const { id } = useParams<{ id: string  }>();
    const queryClient = useQueryClient();
    const currentTickets = queryClient.getQueryData<Ticket[]>(['tickets']); //  Get current cache
    // Fetch ticket details
    const { data: ticket,isLoading, isFetching } = useQuery({
        queryKey: ['tickets', id],
        queryFn: () => fetchTicketById(id,currentTickets),
        initialData: () => {
            return currentTickets?.find(t => t.id === id); // Use cached data first
        },
        staleTime: 5000 // Cache results for 5 seconds before refetching
    });

    const mutation = useMutation({
        mutationFn: async (newStatus: string) => {
            console.log("Updating ticket status for ticketid: " + id);
            await new Promise((r) => setTimeout(r, 3000)); // Simulate API delay
            return newStatus;
        },
        onSuccess: (newStatus) => {
            // 2. Update the Detail Cache (['tickets', id])
            queryClient.setQueryData(['tickets', id], (oldTicket: Ticket | undefined) => {
                return oldTicket ? { ...oldTicket, status: newStatus } : oldTicket;
            });

            // 3. Update the List Cache (['tickets']) so the table updates too
            queryClient.setQueryData(['tickets'], (oldTickets: Ticket[] | undefined) => {
                return oldTickets?.map((t) => 
                    t.id === id ? { ...t, status: newStatus } : t
                );
            });
            
            console.log("Status updated in memory!");
        }
    });

    const handleStatusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newStatus = formData.get('new-status') as string;
        mutation.mutate(newStatus);
    };


    if (
            (isFetching || isLoading) 
            && !ticket 
        ) return <Modal><div>Loading details...</div></Modal>;
    if (!ticket) return <Modal><div>Ticket not found</div></Modal>;

    return (
        <>
            <Modal>
                <div  className="detail-card">
                    <h1>Ticket #{id}</h1>
                    <h2>{ticket?.title}</h2>
                    <p>{ticket?.description}</p>
                    <hr></hr>
                    <p><strong>Created:</strong> {ticket?.created_at}</p>
                    <p><strong>Current Status:</strong> {ticket?.status}</p>
                    <div  className="status-update">
                        <form onSubmit={handleStatusSubmit} >
                            <select id="new-status" name="new-status" defaultValue={ticket.status} style={{backgroundColor: 'rgba(132, 152, 175, 0.69)'}}>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                            <button type="submit" style={{ backgroundColor: 'lightgreen', color: 'white' }}>Update Status</button>
                        </form>
                    </div>

                    
                    <p><Link to={`/`}>← Back to list</Link></p>  
                </div>
            </Modal>
        </>
    );
}