from fastapi.testclient import TestClient
from main import app

app.testing = True      # Changes create_ticket endpoint behavior for testing

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == "Welcome to the Ticket Service API!"
    
    
def test_read_tickets():
    response = client.get("/tickets/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 10
    
    
def test_create_ticket():
    new_ticket = {
        "title": "Test Ticket",
        "description": "This is a test ticket.",
        "status": "open"
    }
    response = client.post("/tickets/", json=new_ticket)
    assert response.status_code == 200
    assert isinstance(response.json(), str)
    
    # Verify the ticket was added
    response = client.get("/tickets/")
    assert response.status_code == 200
    tickets = response.json()
    assert any(ticket["title"] == "Test Ticket" and ticket["id"] == str(11) for ticket in tickets)
    
    
test_read_root()
test_read_tickets()
test_create_ticket()