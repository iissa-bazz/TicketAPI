import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ticketData from './assets/tickets.json'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Support Tickets</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 2)}>
          count is {count}
        </button>
        
    <div className="controls">
        <label>Filter by Status:
            <select>
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </label>

        <label>Sort by:
            <select>
                <option value="created_at">Date Created</option>
                <option value="title">Title</option>
            </select>
        </label>

        <a href="tickets/new.html" className="btn-new">+ New Ticket</a>
    </div>

    <table>
        <thead>
            <tr>
                <th>Title (Click to expand)</th>
                <th>Created At</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            { ticketData.map(ticket => (
                <tr key={ticket.id}>
                    <td><a href={`tickets/${ticket.id}`}>{ticket.title}</a></td>
                    <td>{ticket.created_at}</td>
                    <td><span className="status-pill">{ticket.status}</span></td>
                </tr>
            )) }

        </tbody>
    </table>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
