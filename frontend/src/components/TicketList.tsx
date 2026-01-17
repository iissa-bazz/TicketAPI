import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TicketData from '../assets/tickets.json'


export default function TicketList() {
  const { data: tickets, isLoading, isFetching, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => TicketData,
  staleTime: 5000
  });

    if (isLoading || isFetching) return <div>Loading tickets...</div>;
    if (error) return <div>An error occurred while fetching the tickets...</div>;
    if (!tickets) return <div>No tickets found</div>;
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
      
      <table>
      <thead>
        <tr>
            <th>Title (Click to expand)</th>
            <th>Created At</th>
            <th>Status</th>
        </tr>
      </thead>
        {/* Render your table rows here */}
        <tbody>
        {tickets?.map(t => (
          <tr key={t.id}>
            <td><Link to={`/tickets/${t.id}`}>{t.title}</Link></td>
            <td>{t.created_at}</td>
            <td>{t.status}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* This renders the Modal when the path is /tickets/new or /tickets/:id */}
      <Outlet />
    </div>
  );
}

const btnStyle = { background: 'lightgreen' /*'#638cebff'*/, color: 'white', padding: '10px', textDecoration: 'none' };


