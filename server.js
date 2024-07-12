
const express = require('express');
const cors = require('cors');
const app = express();
const dbconfig = require('./db');
const routerrooms = require('./routes/routerooms');
const userroute = require('./routes/userroute');
const bookingsRoute = require('./routes/bookingsRoute');
const houseownerroute = require('./routes/houseownerroute');

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.use('/api/rooms', routerrooms);
app.use('/api/users', userroute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/houseowners', houseownerroute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server started on port ${port}`));

