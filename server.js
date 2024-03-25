import express from 'express';
import userServices from './userServices.js';

const app = express();
app.use('/user', userServices)

// Start the server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
