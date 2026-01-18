import { Link, useNavigate } from 'react-router-dom';
import {  useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import type { Ticket, TicketInputs } from '../types';



export default function TicketForm() {
    const navigate = useNavigate();
    // LATER: Replace with API call
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<TicketInputs>({ defaultValues: { status: 'open' }});
    
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


    // RHF provides the data directly to this handler
    const onSubmit: SubmitHandler<TicketInputs> = (data) => {
        const currentTickets = queryClient.getQueryData<Ticket[]>(['tickets']) || [];
        const newID = (currentTickets.length + 1).toString();

        const newTicket: Ticket = {
        id: newID,
        title: data.title,
        description: data.desc,
        status: data.status,
        created_at: new Date().toISOString(),
        };

        mutation.mutate(newTicket);
    };

  return (
    <Modal>
    <h2>Create Ticket</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label  htmlFor="title">Title</label>
            <input
            {...register("title", { required: "Title is required" })}
            style={inputStyle}
            />
            {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
        </div>

        <br></br>
        <div className="form-group">
            <label  htmlFor="desc">Description</label>
            <textarea
                {...register("desc", { 
                    required: "Description is required",
                    minLength: { value: 10, message: "Description too short" }
                })}
                rows={4}
                style={inputStyle}
            ></textarea>
            {errors.desc && <span style={{ color: 'red' }}>{errors.desc.message}</span>}
        </div>

        <br></br>
        <div className="form-group">
            <label  htmlFor="status">Status</label>
            <select {...register("status")} defaultValue="open"  style={inputStyle}>
                <option value="open" >Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </div>
        <br></br>
        <div className="actions">
            <button
            type="submit"
            disabled={mutation.isPending}
            style={{ backgroundColor: 'rgba(56, 170, 137, 0.69)', color: 'white' }}
          >
            {mutation.isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
    </form>
    <p><Link to={`/`}>← Back to list</Link></p>  
    </Modal>
    );
}


const inputStyle = {backgroundColor: 'rgba(181, 199, 220, 0.69)'}