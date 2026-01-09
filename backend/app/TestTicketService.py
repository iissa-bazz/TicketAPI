from fastapi.testclient import TestClient
from main import app
import unittest
import pandas as pd

app.testing = True      # Changes create_ticket endpoint behavior for testing

client = TestClient(app)
separator = 100*"_"

class TestTicketService(unittest.TestCase):
    def test_read_root(self):
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == "Welcome to the Ticket Service API!"
        
        
    def test_read_tickets(self):
        print(f"{separator}\nTEST: READ TICKETS\n\nRetrieving all tickets:\n")
        response = client.get("/tickets/")
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        assert len(response.json()) == 11
        with pd.option_context( 'display.max_columns', None):
            print(pd.DataFrame( response.json()))
        
        
    def test_create_ticket(self):
        print(f"{separator}\nTEST: CREATE TICKET\n\nCreating ticket with title 'Test Ticket' and description 'This is a test ticket:'\n")
        new_ticket = {
            "title": "Test Ticket",
            "description": "This is a test ticket.",
            "status": "open"
        }
        response = client.post("/tickets/", json=new_ticket)
        assert response.status_code == 201
        assert isinstance(response.json(), str)
        
        # Verify the ticket was added
        response = client.get("/tickets/")
        assert response.status_code == 200
        tickets = response.json()
        ticket_11 = next(ticket for ticket in tickets if ticket["id"] == "11")
        assert ticket_11["title"] == "Test Ticket" and ticket_11["id"] == "11"
        print(ticket_11)
        
    def test_error_create_ticket(self):
        print(f"\n\n{separator}\nTEST: ERROR CREATE TICKET\n\nCreating tickets with invalid data to test error handling:\n")
        # Test empty title
        new_ticket = {
            "title": " ",
            "description": "This is a test ticket.",
            "status": "open"
        }
        response = client.post("/tickets/", json=new_ticket)
        print(response.json(),response.status_code)
        assert response.status_code == 422
        
        # Test empty description
        new_ticket = {
            "title": "Test Ticket",
            "description": "",
            "status": "open"
        }
        response = client.post("/tickets/", json=new_ticket)
        print(response.json(),response.status_code)
        assert response.status_code == 422
        
        # Test invalid status
        new_ticket = {
            "title": "Test Ticket",
            "description": "This is a test ticket.",
            "status": "invalid_status"
        }
        response = client.post("/tickets/", json=new_ticket)
        print(response.json(),response.status_code)
        assert response.status_code == 422
        
        
    def test_update_ticket_status(self):
        print(f"\n\n{separator}\nTEST: UPDATE TICKET STATUS\n\nUpdating ticket with id '11' to status 'closed':\n")
        response = client.patch("/tickets/11", json={"status": "closed"})
        print(response.json())
        assert response.status_code == 200
        assert response.json() == "Ticket 11 status updated to closed."
        
        # Verify the status was updated
        response = client.get("/tickets/")
        assert response.status_code == 200
        tickets = response.json()
        ticket_11 = next(ticket for ticket in tickets if ticket["id"] == "11")
        print(ticket_11)
        assert ticket_11["status"] == "closed"
        
        # Try to update a non-existing ticket
        response = client.patch("/tickets/999", json={"status": "closed"})
        assert response.status_code == 404
        assert response.json()["detail"] == "Ticket with id 999 does not exist."
    

if __name__ == "__main__":    
    unittest.main()