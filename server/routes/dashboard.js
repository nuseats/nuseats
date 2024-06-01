const router = require("express").Router();
const authorise = require("../middleware/authorise");
const pool = require("../db");

router.get("/", authorise, async (req, res) => {
  try {

    const user = await pool.query(
      "SELECT name FROM users WHERE id = $1",
      [req.user.id] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;