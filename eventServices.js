// Import modules
import express from 'express';
import db from './src/assets/database.js';
import e from 'express';

const app = express();
// Parse JSON request bodies
app.use(express.json());

// Set to true for annoying (but informative) logging
const debug = false;

// Handle POST request to access pins table
app.post('/api/get-pins', (req, res) => {
    if (debug) {
        console.log('Access pin request:', req.body);
    }
    const pinQuery = `
        SELECT * FROM events
    `;
    // Set pins to an array of all rows in pins table
    const pins = db.prepare(pinQuery).all();
    res.send(pins);
});

// Handle POST request to insert into pins table
app.post('/api/create-pin', (req, res) => {
    console.log('Map services -- insert pin request: ', req.body);
    const { eventID, date, time, description } = req.body;
    const pinQuery = `
        INSERT OR IGNORE INTO events VALUES (?, ?, ?, ?);
    `;
    db.prepare(pinQuery).run(eventID, date, time, description);
    // NEEDS error handling
    res.status(200).json({ message: 'Pin successfully inserted into table'});
});

// Handle POST request to delete event
app.post('/api/delete-event', (req, res) => {
    console.log('Delete event request:', req.body);
    const { eventID } = req.body;
    if (!eventID) {
        return res.status(400).json({ message: 'Event ID is required' });
    }
    const eventQuery = `
        DELETE FROM events WHERE eventID = ?;
    `;
    db.prepare(eventQuery).run(eventID);
    res.status(200).json({ message: `Event ${eventID} successfully deleted` });
});
export default app;


