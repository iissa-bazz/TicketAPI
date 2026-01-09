# TicketAPI


## Overview

- [backend/](./backend): Contains the FastAPI backend implementation.
  - [app/](./backend/app): Application source code.
    - [main.py](./backend/app/main.py): The main application file.
    - [TicketService.py](./backend/app/TicketService.py): Module handling ticket operations (db, persistence).
    - [TestTicketService.py](./backend/app/TestTicketService.py): Unit tests for TicketService endpoints.
  - [data/tickets.json](./backend/data/tickets.json): Contains the initial ticket data.
- [docs/](./docs): Documentation and frontend integration plan.
  - [frontend_plan.md](./docs/frontend_plan.md): Explanation of frontend design and API integration.
  - [demo.ipynb](./docs/demo.ipynb): Jupyter notebook demonstrating API usage.
  - [homework-assignment.md](./docs/homework-assignment.md): Original assignment description.



## Prerequisites

Python 3.8 or higher with fastapi and uvicorn installed. You can install the required packages using pip:

```bash
## SETUP FOR PYTHON ENVIRONMENT 
pip install --upgrade pip
pip install fastapi[all]
```


## Running the API

To start the FastAPI server, navigate to the application root at `./backend/app/` and run the following command:

```bash
fastapi dev main.py
```

Alternatively, you can use uvicorn:

```bash
uvicorn main:app --reload
```


## Demo and Testing

A demonstration of the API usage can be found in the Jupyter notebook located at `./docs/demo.ipynb`.

To run the unit tests for the TicketService endpoints, navigate to `./backend/app/` and execute:

```bash
python TestTicketService.py
```