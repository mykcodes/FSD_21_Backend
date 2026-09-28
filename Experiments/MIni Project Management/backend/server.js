const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Temporary project data
let projects = [
    {
        id: 1,
        name: "Portfolio Website",
        description: "Personal portfolio website",
        status: "In Progress"
    },
    {
        id: 2,
        name: "Weather App",
        description: "Weather application using API",
        status: "Completed"
    }
];

// GET - Get all projects
app.get("/api/projects", (req, res) => {
    res.json(projects);
});

// GET - Get one project
app.get("/api/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    res.json(project);
});

// POST - Create a project
app.post("/api/projects", (req, res) => {
    const newProject = {
        id: projects.length + 1,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    };

    projects.push(newProject);

    res.status(201).json(newProject);
});

// PUT - Update a project
app.put("/api/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    project.name = req.body.name;
    project.description = req.body.description;
    project.status = req.body.status;

    res.json(project);
});

// DELETE - Delete a project
app.delete("/api/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const projectExists = projects.some(p => p.id === id);

    if (!projectExists) {
        return res.status(404).json({
            message: "Project not found"
        });
    }

    projects = projects.filter(p => p.id !== id);

    res.json({
        message: "Project deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});