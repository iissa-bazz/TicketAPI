import axios from 'axios';
import {QueryClient}  from '@tanstack/react-query';
import type { Ticket } from '../types';


//const queryClient = useQueryClient();

const apiClient = axios.create({
  // Using /api prefix, nginx will proxy to backend container
  baseURL: '/api', 
  //baseURL: 'http://localhost:8000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const queryKeys = {
  tickets: {
    all: ['tickets'] as const,
    detail: (id: string | undefined) => ['tickets', id] as const,
  },
};


export const fetchTickets = async (): Promise<Ticket[]> => {
    const response = await apiClient.get<Ticket[]>(`/tickets`);
    return response.data;
};

export const fetchTicketById = async (id: string | undefined, queryClient : QueryClient ): Promise<Ticket | undefined>  => {
    // API call to fetch ticket by ID
    console.log("Fetching ticket id: " + id);
    const TicketData = await fetchTickets();
    queryClient.setQueryData<Ticket[]>(queryKeys.tickets.all, TicketData);
    return TicketData.find(t => t.id === id);
};

export default apiClient;