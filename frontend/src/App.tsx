import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import TicketList from './components/TicketList'
import TicketForm from './components/TicketForm'
import TicketDetails from './components/TicketDetails'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList />}>
          <Route path="tickets/new" element={<TicketForm />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
