import { Link, useParams} from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal';
import TicketData from '../assets/tickets.json';
import type { Ticket } from '../types';

const fetchTicketById = async (id: string | undefined) => {
  await new Promise((r) => setTimeout(r, 300));
  return TicketData.find(t => t.id === id);
};

export default function TicketDetails() {
    const { id } = useParams<{ id: string  }>();
    // LATER: Replace with API call
    const queryClient = useQueryClient();
    const { data: ticket,isLoading, isFetching } = useQuery({
        queryKey: ['tickets', id],
        queryFn: () => fetchTicketById(id),
        initialData: () => {
            return queryClient
            .getQueryData<Ticket[]>(['tickets'])?.find((t) => t.id === id);
        },
        staleTime: 5000
    });

    if (isLoading || isFetching) return <Modal><div>Loading details...</div></Modal>;
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
                        <form>
                            <select name="new-status" style={{backgroundColor: 'rgba(75, 78, 229, 0.42)'}}>
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