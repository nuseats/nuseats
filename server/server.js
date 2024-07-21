const express = require('express');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ROUTES //
// Register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// Dashboard route
app.use('/dashboard', require('./routes/dashboard'));

// Ensure there's only one app.listen statement
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});