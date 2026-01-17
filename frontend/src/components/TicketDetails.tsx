import { Link} from 'react-router-dom';
import Modal from './Modal';



export default function TicketDetails() {
  return (<>
            <Modal>
                <div  className="detail-card">
                    <h1>Ticket #1</h1>
                    <h2>Unable to start charging session</h2>
                    <p><strong>Created:</strong> 2025-01-05T10:12:30Z</p>
                    <p><strong>Current Status:</strong> open</p>
                    <div  className="status-update">
                        <form>
                            <select name="new-status">
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                            <button type="submit" style={{ backgroundColor: 'lightgreen', color: 'white' }}>Update Status</button>
                        </form>
                    </div>
                    <hr></hr>
                    <p><strong>Description:</strong><br></br>
                    The charging station shows an error when trying to start the session from the app.</p>

                    
                    <p><Link to={`/`}>← Back to list</Link></p>  
                </div>
            </Modal>
        </>
    );
}