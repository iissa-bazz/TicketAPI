from fastapi.testclient import TestClient
from main import app


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
    
    
test_read_root()
test_read_tickets()