import { Link, useParams} from 'react-router-dom';
import  useState from 'react';
import Modal from './Modal';
import TicketData from '../assets/tickets.json';



export default function TicketDetails() {
    const { id } = useParams<{ id: string }>();
    // LATER: Replace with React Query and API call
    const ticket = TicketData.find((t) => t.id === id);
    
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