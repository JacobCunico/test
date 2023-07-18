const express = require('express');
const morgan = require('morgan');
const router = require('./api');
const cors = require('cors');
const {client} = require('./db/client');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
// logging middleware
app.use(morgan('dev'));

app.use(express.json());

// Passing any request that fuzzy-matches '/api' to the api router
app.use('/api', router);


app.listen(PORT, () => {
// ***** connecting to the Postgres Database when we start the server!! *****
  client.connect();
//^^^^^^^^^^^^^^^^  *****
  console.log(`Server is up and running on port ${PORT}!`)
})

// Api router & Middleware
