# Personal Portfolio Hosted Using Express.js

## Objective
Create a personal portfolio website and host/serve it using a Node.js Express server. This project demonstrates how to set up an Express server and serve static files (HTML, CSS, JS) from a public directory.

## Technologies Used
* Node.js
* Express.js
* HTML5
* Vanilla CSS
* Vanilla JavaScript

## Project Structure
```text
Assignment 1/
├── server.js          # Express server configuration
├── package.json       # Project metadata and dependencies
├── public/            # Static files served by Express
│   ├── index.html     # Portfolio homepage
│   ├── style.css      # Custom styling
│   ├── script.js      # Frontend interactions
│   └── 404.html       # Error page
└── README.md          # Project documentation
```

## Installation Instructions
1. Clone the repository or navigate to the project directory (`Assignment 1`).
2. Ensure you have Node.js installed on your system.
3. Run the following command to install the required dependencies (Express):
   ```bash
   npm install
   ```

## How to Run the Server
Start the Express server by running the start script defined in package.json:
```bash
npm start
```
The terminal will clearly indicate that the server is running on port 3000:
`Server running at http://localhost:3000`

## URL to Access the Portfolio
Once the server is running, open your web browser and navigate to:
[http://localhost:3000](http://localhost:3000)

## How Express Serves the Static Portfolio Files
This project uses Express's built-in middleware to effectively serve the static frontend files. 

In `server.js`, the following line enables serving static files:
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```
This single line tells the Express server to route any incoming HTTP GET requests for static files directly to the `public/` folder. For example, a request for `/` serves `public/index.html`, and a request for `/style.css` seamlessly serves the associated stylesheet, all without needing to explicitly define a separate route for every single file.
