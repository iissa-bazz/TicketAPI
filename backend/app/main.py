
## DEPENDENCIES 
# pip install --upgrade pip
# pip install fastapi[all]

## RUN
# uvicorn app:app --reload

## FRAMEWORK
from fastapi import FastAPI
from TicketService import Ticket, TicketDB, json_file_path




        
TicketDB.load_tickets()
# print(TicketDB.get_tickets())
# print(TicketDB.get_tickets_json())
# TicketDB.dump_tickets('../data/tickets_out.json')

app = FastAPI()


@app.get("/")
def read_root()-> str:
    return "Welcome to the Ticket Service API!"   


@app.get("/tickets/")
def read_tickets() -> list[Ticket]:
    return TicketDB.get_tickets()





    