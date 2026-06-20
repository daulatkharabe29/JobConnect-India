import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/delete/${id}`);
      loadJobs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">👨‍💼 Admin Dashboard</h2>

        <Link to="/add" className="btn btn-success fw-bold">
          + Post Job
        </Link>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company_name}</td>
                <td>{job.location}</td>
                <td>{job.category}</td>
                <td>{job.deadline}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>

                  <button className="btn btn-primary btn-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;