import { Link, Outlet } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys ,fetchTicketById,  fetchTickets} from '../api/client';
import type { Ticket } from '../types';



export function TicketRow({ ticket }: { ticket: Ticket }){
  const queryClient = useQueryClient();
  const { data: ticketDetails, isLoading, error }  = useQuery({
    queryKey: queryKeys.tickets.detail(ticket.id),
    queryFn: () => fetchTicketById(ticket.id, queryClient),
    staleTime: 5000
    });
    
  if (isLoading) return (<tr>
            <td colSpan={3}>Loading...</td>
          </tr>);
  if (error) return (<tr>
            <td colSpan={3}>Error loading ticket details</td>
          </tr>);

return (<tr>
            <td>
              <Link to={`/tickets/${ticketDetails?.id}`}>{ticketDetails?.title}</Link>
            </td>
            <td>{ticketDetails?.created_at}</td>
            <td>{ticketDetails?.status}</td>
          </tr>)
};



export function TicketList() {
  const { data: tickets, isLoading, isFetching, error } = useQuery({
    queryKey: queryKeys.tickets.all,
    queryFn: fetchTickets,
    staleTime: 5000
  });

    if (isLoading || isFetching) return <div>Loading tickets...</div>;
    if (error) return <div>An error occurred while fetching the tickets...</div>;
    if (!tickets) return <div>No tickets found</div>; 
  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Created At</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </tbody>
    </table>
  );
}


export default function TicketListPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Support Tickets</h1>
      
        <div className="controls">
          <label>{` Filter by Status: `}
              <select>
                  <option value="all">All</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
              </select>
          </label>
          <label>{` Sort by: `} 
              <select>
                  <option value="created_at">Date Created</option>
                  <option value="title">Title</option>
              </select>
          </label>
          &nbsp; 
          <Link to="/tickets/new" style={btnStyle}>+ New Ticket    </Link>
      </div>

      <br></br> 
      <TicketList  />
      <Outlet />
    </div>
  );
}

const btnStyle = { background: 'lightgreen' /*'#638cebff'*/, color: 'white', padding: '10px', textDecoration: 'none' };


