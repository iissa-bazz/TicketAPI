import TicketData from '../assets/tickets.json'
import { Link, Outlet } from 'react-router-dom';


export default function TicketList() {

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
        {TicketData.map(t => (
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


