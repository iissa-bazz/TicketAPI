# Frontend Plan

## Pages and  Components

**What frontend pages/components you would create for this system?** 

- `/home` : Landing Page, display the list of items with filtering/sorting options and a button to create a new ticket
    - table containing the list data with clickable elements 
    - drop-down menu to filter by status
    - drop-down menu to sort on a field
    - button for new ticket 
- `/tickets/new` : Form to create and submit a new ticket
    - text fields for title, description
    - drop down menu for status (default set to open) 
- `/tickets/:id`:  Details page for a given ticket with option to update the status 
    - button to change status -> prompt for new status
    - prompt form with drop-down list of status and button to submit

**Specify your technology stack:**

- React with Typescript (catches API contract issues at compile time)
    - React Query (TanStack Query) for data fetching, caching, and state management. Handles loading/error states automatically, reducing boilerplate
    - React Hook Form for form handling and validation
    - Axios for HTTP requests with interceptors
    - React Router for client-side routing
    - Tailwind CSS for styling (rapid prototyping with utility classes)
- Vite as build tool



## How would the frontend communicate with the API?

- Axios API Client with CORS middleware configured on the FastAPI backend or with Vite proxy configured to forward `/api/*` to `http://localhost:8000` (to avoid CORS issues during development) 
- React Query Integration (automatic caching avoids duplicate requests)


## Handling Loading States, Errors, and Form Validation

- React Query has built-in loading/error states and background refetching
- Input validation and sanitization with React Hook Form
- Error handling on the level of network/http errors and validation errors

## MVP Plan: How would you structure the project as a simple MVP?

**Features**

- ✅ Core (included)
  - Display list of tickets
  - Create new ticket form
  - Update ticket status
  - Basic error handling
- ➡️ Advanced (next)	
  - Loading indicators
  - Filter by status
  - Sort by date
  - Search tickets by title
- ❌ Not Included (excluded)
  - Authentication/User Roles
  - Real-time updates (WebSockets)