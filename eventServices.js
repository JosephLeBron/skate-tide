import express from 'express';
const router = express.Router();

// Sample events data
let events = [
  { id: 1, date: '2024-04-10', time: '10:00 AM', description: 'Skate Meetup at Park' },
  { id: 2, date: '2024-04-15', time: '3:00 PM', description: 'Skateboarding Workshop' }
];

// Get all events
router.get('/', (req, res) => {
  res.json(events);
});

// Get a event by ID
router.get('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(event => event.id === eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
});

// Add a new event
router.post('/', (req, res) => {
  const { date, time, description } = req.body;
  if (!date || !time || !description) {
    return res.status(400).json({ message: 'Please provide date, time, and description' });
  }
  
  const newEvent = {
    id: events.length + 1,
    date,
    time,
    description
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

export default router;
