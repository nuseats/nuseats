const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorise = require("../middleware/authorise");

// register route

router.post("/register", validInfo, async (req, res) => {
    try {
        
        //1. destructure the req.body (name, email, password)
        const { name, username, email, password } = req.body;

        //2. check if user exist --> throw error
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        // repetition of user email
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }
          
        //3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        console.log(bcryptPassword);

        //4. enter the new user inside database

        let newUser = await pool.query(
            "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, username, email, bcryptPassword]
        );

        //5. generate jwt token

        const token = jwtGenerator(newUser.rows[0].id);

        return res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login route

router.post("/login", validInfo, async (req, res) => {
    try {

        //1. destruture the req.body
        const { email, password } = req.body;

        //2. check if user doesn't exist --> throw error
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //3. check if incoming password is the same as database password
      
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //4. give jwt token
        const token = jwtGenerator(user.rows[0].id);
        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/verify", authorise, async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const pool = require("../db");
// const validInfo = require("../middleware/validInfo");
// const jwtGenerator = require("../utils/jwtGenerator");
// const authorize = require("../middleware/authorise");

// router.post("/register", validInfo, async (req, res) => {
//   const { email, name, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email
//     ]);

//     if (user.rows.length > 0) {
//       return res.status(401).json("User already exist!");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const bcryptPassword = await bcrypt.hash(password, salt);

//     let newUser = await pool.query(
//       "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
//       [name, email, bcryptPassword]
//     );

//     const jwtToken = jwtGenerator(newUser.rows[0].id);

//     return res.json({ jwtToken });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// router.post("/login", validInfo, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(401).json("Invalid Credential");
//     }

//     const validPassword = await bcrypt.compare(
//       password,
//       user.rows[0].password
//     );

//     if (!validPassword) {
//       return res.status(401).json("Invalid Credential");
//     }
//     const jwtToken = jwtGenerator(user.rows[0].id);
//     return res.json({ jwtToken });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// router.post("/verify", authorize, (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;