import { useState } from "react";
import axios from "axios";

function AddJob() {

  const [job, setJob] = useState({
    title: "",
    company_name: "",
    location: "",
    experience: "",
    salary: "",
    employment_type: "",
    category: "",
    description: "",
    apply_link: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const submitJob = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/jobs/add",
        job,
        {
          headers: {
            "admin-key": "JOBADMIN123"
          }
        }
      );

      alert("Job Added Successfully");

    } catch (err) {
      alert("Error adding job");
      console.log(err);
    }
  };

  return (
    <div className="card p-3 shadow-sm">

      <h4>Post Job (Admin)</h4>

      <input name="title" className="form-control mb-2" placeholder="Job Title" onChange={handleChange} />
      <input name="company_name" className="form-control mb-2" placeholder="Company" onChange={handleChange} />
      <input name="location" className="form-control mb-2" placeholder="Location" onChange={handleChange} />
      <input name="experience" className="form-control mb-2" placeholder="Experience" onChange={handleChange} />
      <input name="salary" className="form-control mb-2" placeholder="Salary" onChange={handleChange} />
      <input name="employment_type" className="form-control mb-2" placeholder="Employment Type" onChange={handleChange} />

      {/* 🔥 CATEGORY DROPDOWN */}
      <select
        name="category"
        className="form-control mb-2"
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        <option value="IT">IT</option>
        <option value="Java">Java</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
      </select>

      <textarea name="description" className="form-control mb-2" placeholder="Description" onChange={handleChange} />
      <input name="apply_link" className="form-control mb-3" placeholder="Apply Link" onChange={handleChange} /> 
      <label htmlFor="">Deadline:</label> <input name="deadline" type="date"  className="form-control mb-2" onChange={handleChange}/>
      <button className="btn btn-primary w-100" onClick={submitJob}>
        Submit Job
      </button>

    </div>
  );
}

export default AddJob;