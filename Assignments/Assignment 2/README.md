# Campus Help Desk

A simple full-stack web application built for a college assignment where students can submit and manage campus-related problems or requests.

## Technologies Used
- **Backend:** Node.js, Express.js, File System (fs) module
- **Frontend:** Plain HTML, CSS, Vanilla JavaScript, fetch() API
- **Data Storage:** JSON file (`requests.json`)

## Features
- Create new campus help desk requests
- View all submitted requests
- Edit/Update existing requests
- Delete requests
- Responsive, clean UI
- API built with Express

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   Open your web browser and navigate to:
   http://localhost:3000

## API Endpoints
- `GET /api/requests` - Retrieve all requests
- `GET /api/requests/:id` - Retrieve a specific request by ID
- `POST /api/requests` - Create a new request
- `PUT /api/requests/:id` - Update an existing request
- `DELETE /api/requests/:id` - Delete a request
