import express from 'express';
import db from './src/assets/database.js';

const app = express();
app.use(express.json());

const debug = false;

// Handle POST request to access events table
app.post('/api/get-events', (req, res) => {
    if (debug) {
        console.log('Access event request:', req.body);
    }
    const eventQuery = `
        SELECT * FROM events
    `;
    // Set events to an array of all rows in events table
    const event = db.prepare(eventQuery).all();
    res.send(event);
});

// Handle POST request to insert into events table
app.post('/api/create-event', (req, res) => {
    console.log('Event services -- insert event request: ', req.body);
    const { eventID, date, time, description } = req.body;
    const eventQuery = `
        INSERT OR IGNORE INTO events VALUES (?, ?, ?, ?);
    `;
    db.prepare(eventQuery).run(eventID, date, time, description);
    // NEEDS error handling
    res.status(200).json({ message: 'Event successfully inserted into table'});
});

// Temporary handler for default event values
app.post('/api/hardcode-events', (req, res) => {
  if (debug) {
      console.log('Event services -- inserting hardcoded events: ', req.body);
  }
  const thisQuery = `
      INSERT OR IGNORE INTO events VALUES ('Some1 ID', 'Some1 date', 630 , 'Some1 description');
      INSERT OR IGNORE INTO events VALUES ('SOme2 ID', 'Some2 date', 730 , 'Some2 description');
  `
  db.exec(thisQuery);
  res.status(200).json({ message: 'Hard coded Events successfully inserted into table'});
});

export default app;


