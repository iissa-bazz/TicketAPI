import { Link, useNavigate } from 'react-router-dom';
import {  useQueryClient, useMutation } from '@tanstack/react-query';
import Modal from './Modal';
import type { Ticket, TicketInputs } from '../types';



export default function TicketForm() {
    const navigate = useNavigate();
    // LATER: Replace with API call
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: async (newTicket: Ticket) => {
            // Simulate API delay
            await new Promise((r) => setTimeout(r, 500));
            return newTicket;
        },
        onSuccess: (newTicket) => {
            // 2. Update the Detail Cache (['tickets', id])
            queryClient.setQueryData(['tickets'], (oldTickets: Ticket[] ) => {
                return newTicket ? [ ...oldTickets,  newTicket] : oldTickets;
            });

            console.log("Created ticket: " + JSON.stringify(newTicket));
            navigate(`/`);
        }
    });

    const handleStatusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newStatus = formData.get('status') as string;
        const newTitle = formData.get('title') as string;
        const newDescription = formData.get('desc') as string;
        const currentTickets = queryClient.getQueryData<Ticket[]>(['tickets']);
        const newID  = (currentTickets?currentTickets.length + 1 : 0).toString() ;
        const createdAt = new Date().toISOString();
        const newTicket: Ticket = {
            id: newID?.toString() || '0',
            title: newTitle,
            description: newDescription,
            status: newStatus as "open" | "in_progress" | "closed",
            created_at: createdAt
        };
        mutation.mutate( newTicket);
        
    };

  return (
    <Modal>
    <h2>Create Ticket</h2>
    <form onSubmit={handleStatusSubmit}>
        <div className="form-group">
            <label  htmlFor="title">Title</label>
            <input type="text" id="title"  name="title" required style={inputStyle} ></input>
        </div>

        <br></br>
        <div className="form-group">
            <label  htmlFor="desc">Description</label>
            <textarea id="desc" name="desc" required rows={4} style={inputStyle}></textarea>
        </div>

        <br></br>
        <div className="form-group">
            <label  htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue="open"  style={inputStyle}>
                <option value="open" >Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </div>
        <br></br>
        <div className="actions">
            <button type="submit" style={{ backgroundColor: 'rgba(56, 170, 137, 0.69)', color: 'white' }}>Submit</button>
        </div>
    </form>
    <p><Link to={`/`}>← Back to list</Link></p>  
    </Modal>
    );
}


const inputStyle = {backgroundColor: 'rgba(181, 199, 220, 0.69)'}