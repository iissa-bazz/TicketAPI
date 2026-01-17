import { Link } from 'react-router-dom';
import Modal from './Modal';



export default function TicketForm() {
  return (
    <Modal>
    <h1>Create / Edit Ticket</h1>
    <form>
        <div className="form-group">
            <label  htmlFor="title">Title</label>
            <input type="text" id="title" value="Unable to start charging session"></input>
        </div>

        <div className="form-group">
            <label  htmlFor="desc">Description</label>
            <textarea id="desc" rows={4}>The charging station shows an error when trying to start the session from the app.</textarea>
        </div>

        <div className="form-group">
            <label  htmlFor="status">Status</label>
            <select id="status">
                <option value="open" selected>Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </div>

        <div className="actions">
            <button type="button" style={{ backgroundColor: 'red', color: 'white' }}>Modify</button>
            <button type="button" style={{ backgroundColor: 'lightblue', color: 'white' }}>Save</button>
            <button type="submit" style={{ backgroundColor: 'lightgreen', color: 'white' }}>Submit</button>
        </div>
    </form>
    <p><Link to={`/`}>← Back to list</Link></p>  
    </Modal>
    );
}
