import express from 'express';
import db from './src/assets/database.js';

const app = express();
app.use(express.json());

const debug = false;

app.post('/api/get-events', (req, res) => {
    if (debug) {
        console.log('Access events request:', req.body);
    }
    const eventQuery = `
        SELECT * FROM events
    `;
    // Set events to an array of all rows in event table
    const events = db.prepare(eventQuery).all();

    // Set the Content-Type header to application/json
    res.setHeader('Content-Type', 'application/json');

    // Send the events as JSON
    res.status(200).json(events);
});

export default app;


