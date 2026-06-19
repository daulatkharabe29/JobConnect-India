import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditJob() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company_name: "",
    location: "",
    experience: "",
    salary: "",
    category: "",
    apply_link: ""
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
    setJob(res.data);
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const updateJob = async () => {
    await axios.put(
      `http://localhost:5000/api/jobs/${id}`,
      job,
      {
        headers: {
          "admin-key": "JOBADMIN123"
        }
      }
    );

    alert("Job Updated Successfully");
    navigate("/admin");
  };

  return (
    <div className="container">

      <h3>Edit Job</h3>

      <input name="title" className="form-control mb-2" value={job.title || ""} onChange={handleChange} />
      <input name="company_name" className="form-control mb-2" value={job.company_name || ""} onChange={handleChange} />
      <input name="location" className="form-control mb-2" value={job.location || ""} onChange={handleChange} />
      <input name="experience" className="form-control mb-2" value={job.experience || ""} onChange={handleChange} />
      <input name="salary" className="form-control mb-2" value={job.salary || ""} onChange={handleChange} />

      <input name="category" className="form-control mb-2" value={job.category || ""} onChange={handleChange} />

      <input name="apply_link" className="form-control mb-2" value={job.apply_link || ""} onChange={handleChange} />

      <button className="btn btn-primary" onClick={updateJob}>
        Update Job
      </button>

    </div>
  );
}

export default EditJob;