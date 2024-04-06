import express from 'express';
import db from './src/assets/database.js';

const app = express();
app.use(express.json());

const debug = false;

// Handle POST request to access pins table
app.post('/api/get-events', (req, res) => {
    if (debug) {
        console.log('Access event request:', req.body);
    }
    const eventQuery = `
        SELECT * FROM Events
    `;
    // Set pins to an array of all rows in pins table
    const event = db.prepare(eventQuery).all();
    res.send(event);
});

// Handle POST request to insert into pins table
app.post('/api/create-event', (req, res) => {
  console.log('Event services -- insert event request: ', req.body);
  const { date, time, description } = req.body;
  const eventQuery = `
      INSERT OR IGNORE INTO Events VALUES (?, ?, ?, ?);
  `;
  db.prepare(eventQuery).run(date, time, description);
  // NEEDS error handling
  res.status(200).json({ message: 'Event successfully inserted into table'});
});

// Temporary handler for default pin values
app.post('/api/hardcode-events', (req, res) => {
  if (debug) {
      console.log('Event services -- inserting hardcoded events: ', req.body);
  }
  const thisQuery = `
      INSERT OR IGNORE INTO Events VALUES ('Some date', 'Some time', 'Some description');
      INSERT OR IGNORE INTO Events VALUES ('Some2 date', 'Some2 time', 'Some2 description');
  `
  db.exec(thisQuery);
  res.status(200).json({ message: 'Hard coded Events successfully inserted into table'});
});

export default app;


