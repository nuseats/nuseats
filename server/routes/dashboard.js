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

router.get('/api/canteens', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM canteens');
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching canteen data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;