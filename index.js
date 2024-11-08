// index.js
const express = require('express');  // Import express
const app = express();               // Initialize the app
const PORT = 3000;                   // Define the port

// Define the /status endpoint
app.get('/status', (req, res) => {
  res.json({ status: 'API is working!' });  // Send JSON response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
