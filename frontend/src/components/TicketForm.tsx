import { Link } from 'react-router-dom';
import Modal from './Modal';



export default function TicketForm() {
  return (
    <Modal>
    <h1>Create Ticket</h1>
    <form>
        <div className="form-group">
            <label  htmlFor="title">Title</label>
            <input type="text" id="title"  style={inputStyle} ></input>
        </div>

        <div className="form-group">
            <label  htmlFor="desc">Description</label>
            <textarea id="desc" rows={4} style={inputStyle}></textarea>
        </div>

        <div className="form-group">
            <label  htmlFor="status">Status</label>
            <select id="status"  style={inputStyle}>
                <option value="open" selected>Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </div>

        <div className="actions">
            <button type="submit" style={{ backgroundColor: 'lightgreen', color: 'white' }}>Submit</button>
        </div>
    </form>
    <p><Link to={`/`}>← Back to list</Link></p>  
    </Modal>
    );
}


const inputStyle = {backgroundColor: 'rgba(75, 78, 229, 0.42)'}