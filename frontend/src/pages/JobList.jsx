import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [search, setSearch] = useState("");

  const categories = [
    "ALL",
    "IT",
    "Java",
    "Frontend",
    "Backend",
    "HR",
    "Finance",
    "Marketing"
  ];

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      setAllJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(e.target.value);

    if (value === "") {
      setJobs(allJobs);
      return;
    }

    const filtered = allJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(value) ||
        job.company_name?.toLowerCase().includes(value) ||
        job.location?.toLowerCase().includes(value)
    );

    setJobs(filtered);
  };

  const filterCategory = (category) => {
    if (category === "ALL") {
      setJobs(allJobs);
      return;
    }

    const filtered = allJobs.filter(
      (job) => job.category === category
    );

    setJobs(filtered);
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">🚀 Latest Job Openings</h2>
        <p className="text-muted">Find your dream job today</p>
      </div>

      {/* SEARCH */}
      <div className="mb-3">
        <input
          className="form-control form-control-lg shadow-sm"
          placeholder="Search jobs (title, company, location)..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterCategory(cat)}
            className="btn btn-sm btn-outline-dark rounded-pill px-3"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* JOB LIST */}
      <div className="row g-3">

        {jobs.length === 0 ? (
          <div className="text-center text-muted">
            No Jobs Found
          </div>
        ) : (
          jobs.map((job) => {
            const isExpired =
              new Date(job.deadline) < new Date();

            return (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={job.id}
              >

                <div className="card job-card border-0 shadow-sm h-100">

                  {/* TOP BADGES */}
                  <div className="d-flex justify-content-between p-2">

                    <span className={`badge ${isExpired ? "bg-danger" : "bg-success"}`}>
                      {isExpired ? "Expired" : "Active"}
                    </span>

                    <span className="badge bg-primary">
                      {job.category}
                    </span>

                  </div>

                  {/* BODY */}
                  <div className="card-body">

                    <h5 className="fw-bold mb-1">
                      {job.title}
                    </h5>

                    <p className="text-muted mb-1">
                      {job.company_name}
                    </p>

                    <p className="mb-1 small">
                      📍 {job.location}
                    </p>

                    <p className="mb-1 small">
                      💼 {job.experience}
                    </p>

                    <p className="mb-2 text-danger small">
                      ⏳ Deadline: {job.deadline}
                    </p>

                    {/* BUTTONS */}
                    <Link
                      to={`/job/${job.id}`}
                      className="btn btn-primary btn-sm w-100 mb-2"
                    >
                      View Details
                    </Link>

                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success btn-sm w-100 mb-2"
                    >
                      Apply Now
                    </a>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `🔥 ${job.title} at ${job.company_name}\n📍 ${job.location}\n👉 http://localhost:3000/job/${job.id}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-success btn-sm w-100"
                    >
                      Share on WhatsApp
                    </a>

                  </div>
                </div>

              </div>
            );
          })
        )}

      </div>

      {/* CUSTOM CSS */}
      <style>{`
        .job-card {
          transition: all 0.2s ease-in-out;
          border-radius: 12px;
        }

        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>

    </div>
  );
}

export default JobList;