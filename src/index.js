const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoint
app.get('/api/greet', (req, res) => {
    const name = req.query.name || 'Guest';
    if (name.toLowerCase() === 'error') {
        // Simulate a server error for testing pipeline failures
        return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: `Hello, ${name}! Welcome to the DevOps API.` });
});

// Start the server (only if not in test mode)
if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;