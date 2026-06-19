const db = require("../db/connection");

// GET ALL JOBS
exports.getAllJobs = (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// GET JOB BY ID
exports.getJobById = (req, res) => {
    db.query("SELECT * FROM jobs WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

// ADD JOB
exports.addJob = (req, res) => {
    const sql = "INSERT INTO jobs SET ?";
    db.query(sql, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Job added" });
    });
};

// UPDATE JOB
exports.updateJob = (req, res) => {
    const sql = "UPDATE jobs SET ? WHERE id = ?";
    db.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Job updated" });
    });
};

// DELETE JOB
exports.deleteJob = (req, res) => {
    db.query("DELETE FROM jobs WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Job deleted" });
    });
};

//update job
const updateJob = (req, res) => {
  const { id } = req.params;

  const {
    title,
    company_name,
    location,
    experience,
    salary,
    category,
    deadline,
    apply_link
  } = req.body;

  const sql = `
    UPDATE jobs SET
    title=?,
    company_name=?,
    location=?,
    experience=?,
    salary=?,
    category=?,
    deadline=?,
    apply_link=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      title,
      company_name,
      location,
      experience,
      salary,
      category,
      deadline,
      apply_link,
      id
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Job updated successfully" });
    }
  );
};
// SEARCH JOBS
exports.searchJobs = (req, res) => {
    const q = `%${req.query.q}%`;

    const sql = `
        SELECT * FROM jobs
        WHERE title LIKE ?
        OR company_name LIKE ?
        OR location LIKE ?
        OR category LIKE ?
    `;

    db.query(sql, [q, q, q, q], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

//getall job
const getAllJobs = (req, res) => {

    const sql = `
        SELECT *
        FROM jobs
        WHERE deadline >= CURDATE()
        ORDER BY posted_date DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

