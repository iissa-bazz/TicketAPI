import { Link, useParams} from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Modal from './Modal';
import apiClient from '../api/client';
import type { Ticket } from '../types';


export default function TicketDetails() {
    // Get ticket ID from URL parameters
    const { id } = useParams<{ id: string  }>();
    const fetchTicketById = async (id: string | undefined)  => {
        // API call to fetch ticket by ID
        console.log("Fetching ticket id: " + id);
        const TicketData = await apiClient.get<Ticket[]>(`/tickets`).then(res => res.data);
        return TicketData.find(t => t.id === id);
    };
    //  Get current cache
    const queryClient = useQueryClient();
    const currentCache = queryClient.getQueryData<Ticket[]>(['tickets']); 

    // Fetch ticket details
    const { data: ticket,isLoading, isFetching } = useQuery({
        queryKey: ['tickets', id],
        queryFn: () => fetchTicketById(id),
        initialData: () => {
            return currentCache?.find(t => t.id === id); // Use cached data first
        },
        staleTime: 5000 // Cache results for 5 seconds before refetching
    });

    const mutation = useMutation({
        mutationFn: async (newStatus: string) => {
            console.log("Updating ticket status for ticketid: " + id);
            const response = await apiClient.patch<Ticket>(`/tickets/${id}`, { status: newStatus });
            return {response: response.data, status: newStatus };
        },
        onSuccess: (response) => {
            console.log(response.response);
            queryClient.invalidateQueries({ queryKey: ['tickets', id] }); // Invalidate ticket query to refetch   
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
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
            //&& !ticket // Uncommenting this line will result in the default value of the select options to remain stuck at the initial value when the component rendered...
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
                            <select id="new-status" name="new-status" defaultValue={ticket?.status}  style={{backgroundColor: 'rgba(132, 152, 175, 0.69)'}}>
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