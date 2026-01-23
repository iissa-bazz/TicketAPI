import { Link, useNavigate } from 'react-router-dom';
import {  useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import type {  TicketInputs } from '../types';
import apiClient, { queryKeys } from '../api/client';



export default function TicketForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<TicketInputs>({ defaultValues: { status: 'open' }});
    
    const mutation = useMutation({
        mutationFn: async (newTicket: TicketInputs) => {
            await  apiClient.post<TicketInputs, string>(`/tickets`, newTicket );
            return newTicket;
        },
        onSuccess: (newTicket: TicketInputs) => {
            console.log(`New ticket created: ${JSON.stringify(newTicket)}`); 
            queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all }); // Invalidate ticket query to refetch   
            navigate(`/`);
        }
    });


    // RHF provides the data directly to this handler
    const onSubmit: SubmitHandler<TicketInputs> = (data) => {

        const newTicket: TicketInputs = {
        title: data.title,
        description: data.description,
        status: data.status
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
            /><br></br>
            {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
        </div>

        <br></br>
        <div className="form-group">
            <label  htmlFor="description">Description</label>
            <textarea
                {...register("description", { 
                    required: "Description is required",
                    minLength: { value: 10, message: "Description too short" }
                })}
                rows={4}
                style={inputStyle}
            ></textarea><br></br>
            {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
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