import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TicketList from './components/TicketList'

function App() {
  const [count, setCount] = useState(0)

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
