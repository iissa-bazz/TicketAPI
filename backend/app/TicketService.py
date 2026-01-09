from pydantic import BaseModel, ValidationError
from typing import Literal
import json
from datetime import datetime

# GLOBAL VARIABLES
json_file_path = '../data/tickets.json'

class NewTicket(BaseModel):
    title: str
    description: str
    status: Literal["open" , "in_progress" , "closed"] = "open"


class Ticket(NewTicket):    
    id: str
    created_at: datetime
    
    
class TicketDB:
    tickets: dict[str,Ticket] = {}
    
    @classmethod
    def create_ticket(cls, new_ticket: NewTicket) -> Ticket:
        ticket_id = len(cls.tickets)+1
        while str(ticket_id) in cls.tickets.keys():
            ticket_id = ticket_id+1
        ticket = Ticket(
            id=str(ticket_id),
            title=new_ticket.title,
            description=new_ticket.description,
            status=new_ticket.status,
            created_at=datetime.now()
        )
        cls.add_ticket(ticket)
        return ticket
    
    @classmethod
    def add_ticket(cls, ticket: Ticket) -> None:
        if ticket.id in cls.tickets.keys():
            raise ValueError(f"Ticket with id {ticket.id} already exists.")
        else:
            cls.tickets[ticket.id]=ticket
        
    @classmethod
    def get_tickets(cls) -> dict[str,Ticket]:
        return cls.tickets.values()
    
    @classmethod
    def get_tickets_json(cls) -> list[dict]:
        return [ ticket.model_dump( mode='json') for ticket in cls.tickets.values() ]
    
    ## I/O METHODS
    @classmethod
    def dump_tickets(cls, filename:str=json_file_path) -> None:
        with open(filename, 'w') as fd:
            json.dump( cls.get_tickets_json() , fd, indent=4)   
    
    @classmethod
    def load_tickets(cls, filename:str=json_file_path) -> None:
        # LOAD JSON DATA
        with open(filename) as json_data:
            data = json.load(json_data)
        try: # SERIALIZE JSON DATA TO TICKET OBJECTS
            tickets = [Ticket.model_validate(item) for item in data]
        except ValidationError as e: 
            print(e)
        # STORE TICKET OBJECTS IN DB
        for ticket in tickets:
            cls.add_ticket(ticket)
        #print(f"Loaded {len(tickets)} tickets from {filename}")







if __name__ == "__main__":

    # LOAD JSON DATA
    with open(json_file_path) as json_data:
        data = json.load(json_data)
        print(data[0])
        print(len(data))


    # SERIALIZE JSON DATA TO TICKET OBJECTS
    try:
        tickets = [Ticket.model_validate(item) for item in data]
        tickets = { ticket.id: ticket for ticket in tickets }
        print(tickets["1"])
        
    # It is possible that the coercion in Ticket.model_validate fails
    except ValidationError as e: 
        print(e)
    
    TicketDB.load_tickets(json_file_path)
    print(TicketDB.get_tickets())
    print(TicketDB.get_tickets_json())
    TicketDB.dump_tickets('../data/tickets_out.json')
        