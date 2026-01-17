import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import TicketList from './components/TicketList'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
