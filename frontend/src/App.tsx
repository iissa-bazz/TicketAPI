import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import './App.css'
import TicketListPage from './components/TicketList'
import TicketForm from './components/TicketForm'
import TicketDetails from './components/TicketDetails'

function App() {

const queryClient = new QueryClient({
                          defaultOptions: {
                            queries: {
                              throwOnError: true, // This bridges React Query and Error Boundaries
                            },
                            mutations: {
                              throwOnError: true,
                            }
                          },
                      });

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TicketListPage />}>
                <Route path="tickets/new" element={<TicketForm />} />
                <Route path="tickets/:id" element={<TicketDetails />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
