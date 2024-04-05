import express from 'express';
import cors from 'cors';

import userServices from './userServices.js';
import mapServices from './mapServices.js';
import eventServices from './eventServices.js';

var app = express();
 
app.use(cors());
app.use(express.json());

const options = {
  origin: ['http://localhost:5173']
};

app.use(cors(options));
app.use('/user', userServices)
app.use('/map', mapServices)
app.use('/event', eventServices)


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
