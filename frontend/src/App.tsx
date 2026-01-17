import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import TicketList from './components/TicketList'
import TicketForm from './components/TicketForm'
import TicketDetails from './components/TicketDetails'

function App() {

const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TicketList />}>
            <Route path="tickets/new" element={<TicketForm />} />
            <Route path="tickets/:id" element={<TicketDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
