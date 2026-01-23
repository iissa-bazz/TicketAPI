import { Link, useParams} from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Modal from './Modal';
import apiClient , { queryKeys ,fetchTicketById } from '../api/client';
import type { Ticket, Status } from '../types';


export default function TicketDetails() {
    // Get ticket ID from URL parameters
    const { id } = useParams<{ id: string  }>();
    //  Get current cache
    const queryClient = useQueryClient();

    // Fetch ticket details
    const { data: ticket,isLoading, isFetching } = useQuery({
        queryKey: queryKeys.tickets.detail(id),
        queryFn: () => fetchTicketById(id, queryClient),
        initialData: () => {
            return queryClient.getQueryData<Ticket[]>(['tickets'])?.find(t => t.id === id); // Use cached data first
        },
        staleTime: 5000 // Cache results for 5 seconds before refetching
    });

    const mutation = useMutation({
        mutationFn: async (newStatus: Status) => {
            console.log("Updating ticket status for ticket " + id);
            const response = await apiClient.patch<Ticket>(`/tickets/${id}`, { status: newStatus });
            console.log(response.data);
            return { ticketId: id, newStatus };
        },
        onSuccess: ({ ticketId, newStatus }) => {

            // 1. Update the specific ticket cache
            queryClient.setQueryData<Ticket>(queryKeys.tickets.detail(ticketId), (old) => {
                return (!old) ? old :{ ...old, status: newStatus };
            });
            
            // 2. Update the tickets list cache
            queryClient.setQueryData<Ticket[]>(queryKeys.tickets.all, (old) => {
                if (!old) return old;
                return old.map(ticket => 
                    ticket.id === ticketId 
                        ? { ...ticket, status: newStatus } 
                        : ticket
                );
            });
            //queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(id) }); // Invalidate ticket query to refetch   
        }
    });

    const handleStatusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newStatus = formData.get('new-status') as Status;
        mutation.mutate(newStatus);
    };

    if ( (isFetching || isLoading)  && !ticket ) return <Modal><div>Loading details...</div></Modal>;
    if (!ticket) return <Modal><div>Ticket not found</div></Modal>;
        
    return (
        <>
            <Modal>
                <div  className="detail-card">
                    <h1>Ticket #{id}</h1>
                    <h2>{ticket.title}</h2>
                    <p>{ticket.description}</p>
                    <hr></hr>
                    <p><strong>Created:</strong> {ticket.created_at}</p>
                    <p><strong>Current Status:</strong> {ticket?.status}</p>
                    <div  className="status-update">
                        <form onSubmit={handleStatusSubmit} >
                            <select id="new-status" name="new-status" key={ticket.status} defaultValue={ticket?.status}  style={{backgroundColor: 'rgba(132, 152, 175, 0.69)'}}>
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