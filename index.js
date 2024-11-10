const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Define a route for fetching data from the target URL
app.get('/', (req, res) => {
    res.json({"msg": " Welcome to the custom proxy, use service like : http://localhost:3000/fetch-data?url=https://example.com/api/data"})
});

app.get('/fetch-data', async (req, res) => {
    try {
        // Get target URL from query params, or define it directly
        const targetUrl = req.query.url || 'https://api.malsync.moe/mal/anime/19';
        
        // Make the request to the target server
        const response = await axios.get(targetUrl, {
            // headers: {
            //     'User-Agent': 'Your User Agent',
            //     'Authorization': 'Bearer YOUR_TOKEN' // Add any required headers here
            // }
        });
        
        // Send the data back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors and send a message back to the client
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data from target URL' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
});
