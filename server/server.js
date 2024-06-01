const express = require('express');
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ROUTES //

// register and login routes

app.use('/auth', require('./routes/jwtAuth'));

//dashboard route

app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})