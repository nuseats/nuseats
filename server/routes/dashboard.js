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

router.get('/canteens', async (req, res) => {
  try {
      const results = await pool.query('SELECT * FROM canteens');
      res.status(200).json({
        status: 'success',
        results: results.rows.length,
        data: {
          canteens: results.rows
        }
      })
  } catch (err) {
      console.error('Error fetching canteen data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/canteens/:id', async (req, res) => {
  try {
      const canteens = await pool.query('SELECT * FROM canteens WHERE id = $1', [req.params.id]);
      const reviews = await pool.query(
        "select * from reviews where canteen_id = $1",
        [req.params.id]
      );
      res.status(200).json({
        status: 'success',
        data: {
          canteen: canteens.rows[0],
          reviews: reviews.rows
        }
      });
  } catch (err) {
      console.error('Error fetching canteen data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/canteens", async (req, res) => {
  console.log(req.body);

  try {
    const results = await pool.query(
      "INSERT INTO canteens (name, nearestFaculty) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "succes",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/canteens/:id", async (req, res) => {
  try {
    const results = await pool.query(
      "UPDATE canteens SET name = $1, nearestFaculty = $2 where id = $3 returning *",
      [req.body.name, req.body.nearestFaculty, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/canteens/:id", async (req, res) => {
  try {
    const results = pool.query("DELETE FROM canteens where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/canteens/:id/add-review", async (req, res) => {
  try {
    const results = await pool.query(
      "INSERT INTO reviews (canteen_id, title, review) values ($1, $2, $3) returning *",
      [req.body.canteen_id, req.body.title, req.body.review]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;