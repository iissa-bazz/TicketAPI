
## DEPENDENCIES 
# pip install --upgrade pip
# pip install fastapi[all]

## RUN
# fastapi dev main.py
## OR
# uvicorn main:app --reload

## FRAMEWORK
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from TicketService import NewTicket, Ticket, TicketDB, json_file_path
# INITIALIZE TICKET DB
TicketDB.load_tickets()

app = FastAPI()
app.testing = False      # Changes create_ticket endpoint behavior for testing


@app.get("/")
def read_root()-> str:
    return "Welcome to the Ticket Service API!"   


@app.get("/tickets/")
def read_tickets() -> list[Ticket]:
    return TicketDB.get_tickets()

@app.post("/tickets/")
def create_ticket(ticket: NewTicket) -> str:
    if ticket.title.strip() == "":
        raise RequestValidationError("Ticket title cannot be empty.")
    elif ticket.description.strip() == "":
        raise RequestValidationError("Ticket description cannot be empty.")
    elif ticket.status not in ["open","in_progress","closed"]:
        raise RequestValidationError("Ticket status must be one of: open, in_progress, closed.")
    new_ticket = TicketDB.create_ticket(ticket)
    if not app.testing: TicketDB.dump_tickets()
    return new_ticket.id




    