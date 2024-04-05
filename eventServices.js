import express from 'express';
import db from './src/assets/database.js';

const router = express.Router();

// Get all events
router.get('/all', (req, res) => {
  const selectQuery = `
    SELECT * FROM events
  `;

  try {
    const events = db.prepare(selectQuery).all();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create a new event
router.post('/create', (req, res) => {
  const { eventID, date, time, description } = req.body;
  
  if (!eventID || !date || !time || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const insertQuery = `
    INSERT INTO events (eventID, date, time, description)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const stmt = db.prepare(insertQuery);
    stmt.run(eventID, date, time, description);
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

export default router;
