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
        `SELECT
          r.id,
          r.canteen_id,
          r.review,
          r.created_at,
          r.time_sensitive,
          u.username
        FROM
          reviews r
        JOIN
          users u
        ON
          r.user_id = u.id
        WHERE
          r.canteen_id = $1`,
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
        canteens: results.rows[0],
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
        canteen: results.rows[0],
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
      "INSERT INTO reviews (canteen_id, user_id, review) values ($1, $2, $3) returning *",
      [req.body.canteen_id, req.body.user_id, req.body.review]
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

router.get('/review/:reviewId/status', authorise, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  const result = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM upvotes WHERE review_id = $1 AND user_id = $2
    ) AS has_upvoted,
    (SELECT COUNT(*) FROM upvotes WHERE review_id = $1) AS upvote_count
  `, [reviewId, userId]);

  return res.json(result.rows[0]);
});

router.post('/review/:reviewId/upvote', authorise, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;
  try {
    const existingUpvote = await pool.query('SELECT * FROM Upvotes WHERE user_id = $1 AND review_id = $2', [userId, reviewId]);
    if (existingUpvote.rows.length > 0) {
        await pool.query('DELETE FROM Upvotes WHERE user_id = $1 AND review_id = $2', [userId, reviewId]);
        res.status(200).json({ message: 'Upvote removed' });
    } else {
        await pool.query('INSERT INTO Upvotes (user_id, review_id) VALUES ($1, $2)', [userId, reviewId]);
        res.status(200).json({ message: 'Upvoted successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/random-review', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT reviews.*, users.username
       FROM reviews
       JOIN users ON reviews.user_id = users.id
       ORDER BY RANDOM()
       LIMIT 1`
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'No reviews found' });
    }
  } catch (err) {
    console.error('Error fetching random review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;