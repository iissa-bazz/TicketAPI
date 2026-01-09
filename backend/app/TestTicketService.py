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
    
def test_error_create_ticket():
    # Test empty title
    new_ticket = {
        "title": "",
        "description": "This is a test ticket.",
        "status": "open"
    }
    response = client.post("/tickets/", json=new_ticket)
    print(response.json())
    assert response.status_code == 422
    
    # Test empty description
    new_ticket = {
        "title": "Test Ticket",
        "description": "",
        "status": "open"
    }
    response = client.post("/tickets/", json=new_ticket)
    print(response.json())
    assert response.status_code == 422
    
    # Test invalid status
    new_ticket = {
        "title": "Test Ticket",
        "description": "This is a test ticket.",
        "status": "invalid_status"
    }
    response = client.post("/tickets/", json=new_ticket)
    print(response.json())
    assert response.status_code == 422
    

if __name__ == "__main__":    
    test_read_root()
    test_read_tickets()
    test_create_ticket()
    test_error_create_ticket()
    print("All tests passed.")