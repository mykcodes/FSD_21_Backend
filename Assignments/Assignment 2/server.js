const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataFile = path.join(__dirname, 'requests.json');

// Helper to read data
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// 1. GET /api/requests
app.get('/api/requests', (req, res) => {
  const requests = readData();
  res.json(requests);
});

// 2. GET /api/requests/:id
app.get('/api/requests/:id', (req, res) => {
  const requests = readData();
  const request = requests.find(r => r.id === req.params.id);
  
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  res.json(request);
});

// 3. POST /api/requests
app.post('/api/requests', (req, res) => {
  const { studentName, email, category, description, priority } = req.body;
  
  if (!studentName || !email || !category || !description || !priority) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const requests = readData();
  const newRequest = {
    id: Date.now().toString(),
    studentName,
    email,
    category,
    description,
    priority
  };
  
  requests.push(newRequest);
  writeData(requests);
  
  res.status(201).json(newRequest);
});

// 4. PUT /api/requests/:id
app.put('/api/requests/:id', (req, res) => {
  const { studentName, email, category, description, priority } = req.body;
  const requests = readData();
  const index = requests.findIndex(r => r.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  if (!studentName || !email || !category || !description || !priority) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const updatedRequest = {
    ...requests[index],
    studentName,
    email,
    category,
    description,
    priority
  };
  
  requests[index] = updatedRequest;
  writeData(requests);
  
  res.json(updatedRequest);
});

// 5. DELETE /api/requests/:id
app.delete('/api/requests/:id', (req, res) => {
  const requests = readData();
  const index = requests.findIndex(r => r.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  requests.splice(index, 1);
  writeData(requests);
  
  res.json({ message: 'Request deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
