const express = require("express");
const cors = require("cors");

require("./cron/deleteExpiredJobs");

const app = express();

app.use(cors());

app.use(express.json());

const deleteExpiredJobs = require("./cron/deleteExpiredJobs");
app.use("/api/auth", require("./routes/authRoutes"));

// run every 1 hour
setInterval(() => {
  deleteExpiredJobs();
}, 60 * 60 * 1000);

const jobRoutes = require("./routes/jobRoutes");

app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {

    res.send("JobConnect Backend Running");

});


const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});