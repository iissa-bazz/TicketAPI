
## DEPENDENCIES 
# pip install --upgrade pip
# pip install fastapi[all]

## RUN
# uvicorn app:app --reload

## FRAMEWORK
from fastapi import FastAPI
from TicketService import Ticket, TicketDB
TicketDB.load_tickets('tickets.json')
app = FastAPI()


@app.get("/")
def read_root()-> str:
    return "Welcome to the Ticket Service API!"   


@app.get("/tickets/")
def read_tickets() -> list[Ticket]:
    return TicketDB.get_tickets()