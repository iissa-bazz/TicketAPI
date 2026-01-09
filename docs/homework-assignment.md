# Software Engineering Intern – Take-Home Exercise

**Swisscharge – Ticketing API & Frontend Integration Design**

Thank you for taking the time to work on this exercise.

This assignment is designed to give us insight into how you approach building simple APIs, structuring data, and thinking about frontend integration for an MVP-style product.

Please keep the scope small and pragmatic, we are not looking for a production-ready system.

## Overview

You will build a **very simple ticketing system API** and explain how you would integrate it into a frontend application.

### Deliverables

1. **Working API implementation (required)**
2. **Frontend design & integration explanation (required)**

Estimated time: **2–3 hours**  
Deadline: **7 days**

## Part 1 — Ticketing API

### Goal

Implement a minimal REST API for managing customer support tickets.

### Ticket model

Each ticket should contain:

```
id: string
title: string
description: string
status: "open" | "in_progress" | "closed"
created_at: datetime
```

### Required endpoints

| Method | Endpoint      | Description          |
| -----: | ------------- | -------------------- |
|    GET | /tickets      | List all tickets     |
|   POST | /tickets      | Create a new ticket  |
|  PATCH | /tickets/{id} | Update ticket status |

### Requirements

- Use **Python** (FastAPI is recommended but not required)
- Validate incoming data (the provided tickets.json simulates an existing ticket source).
- Return appropriate HTTP status codes
- Handle basic error cases (e.g. invalid input, ticket not found)
- For changes made via the API (`POST` / `PATCH`), you may either:
  - keep data in memory during runtime (sufficient), or
  - persist updates back to a local JSON file (optional bonus).
- Provide clear instructions on how to run the API

You may use any additional small libraries you find helpful.

## Part 2 — Frontend Design & Integration (no coding required)

In `docs/frontend_plan.md`, please explain:

1. What frontend pages/components you would create for this system, also specify your technology stack
2. How the frontend would communicate with the API
3. How you would handle loading states, errors, and form validation
4. How you would structure the project as a simple MVP

You may write in bullet points or short paragraphs.

## Suggested Project Structure

```
ticketing-exercise/
│
├─ backend/
│ ├─ app.py
│ ├─ requirements.txt
│ └─ data/
│ └─ tickets.json
│
└─ docs/
└─ frontend_plan.md
```

You are free to adapt this structure.

## What We Evaluate

We care about:

- Correctness and clarity of your API design
- Sensible data modeling and endpoint structure
- Error handling and validation
- Code readability and organization
- Clarity of your frontend integration explanation

We **do not** evaluate UI design or advanced architecture.

## Time Expectation

We expect this to take **2–3 hours**.  
Please do not over-engineer, we value clarity over completeness.

## Submission

Please provide a link to your GitHub repository containing your solution.

If you have any questions, feel free to reach out.

Good luck, and we look forward to reviewing your work!
