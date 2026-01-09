## FRAMEWORK
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from TicketService import NewTicket, Ticket, StatusUpdate, TicketDB
# INITIALIZE TICKET DB
TicketDB.load_tickets()

app = FastAPI()
app.testing = False      # Changes create_ticket endpoint behavior for testing

@app.get("/")
def read_root()-> str:
    """Welcome endpoint."""
    return "Welcome to the Ticket Service API!"   

@app.get("/tickets/")
def read_tickets() -> list[Ticket]:
    """Retrieve all tickets."""
    return TicketDB.get_tickets()

@app.post("/tickets/")
def create_ticket(ticket: NewTicket) -> str:
    """Creates a new ticket in the database with unique ID."""
    if ticket.title.strip() == "":
        raise RequestValidationError("Ticket title cannot be empty.")
    elif ticket.description.strip() == "":
        raise RequestValidationError("Ticket description cannot be empty.")
    new_ticket = TicketDB.create_ticket(ticket)
    if not app.testing: TicketDB.dump_tickets()
    return new_ticket.id

@app.patch("/tickets/{ticket_id}")
def update_ticket_status(ticket_id: str, status: StatusUpdate) -> str:
    """Update the status of an existing ticket."""
    try:
        TicketDB.update_ticket(ticket_id, status.status)
        if not app.testing: TicketDB.dump_tickets()
        return f"Ticket {ticket_id} status updated to {status.status}."
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))




    