// Import modules
import express from 'express';
//import * as db from 'database'; // Import database.js file
import { db } from './assets/database';

// Create Express application
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Handle POST request to create-account endpoint
app.post('/api/create-account', (req, res) => {
  const { email, password } = req.body;

  // Example: Insert new user into users table
  const insertUserQuery = `
    INSERT INTO users (email, password) VALUES (?, ?)
  `;
  try {
    // Execute the query
    db.prepare(insertUserQuery).run(email, password);

    // Respond with success message
    res.status(200).json({ message: 'Account created successfully' });
  } catch (error) {
    // If an error occurs, respond with error message
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Error creating account. Please try again.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
