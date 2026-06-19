import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {

    loadJob();

  }, []);

  const loadJob = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      setJob(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  if (!job) {

    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );

  }

  return (

    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2>{job.title}</h2>

        <h4 className="text-primary">
          {job.company_name}
        </h4>

        <p>
          📍 {job.location}
        </p>

        <p>
          💼 {job.experience}
        </p>

        <p>
          💰 {job.salary}
        </p>

        <hr />

        <h5>Description</h5>

        <p>
          {job.description}
        </p>

        <a
          href={job.apply_link}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success mt-3"
        >
          Apply Now
        </a>

      </div>

    </div>

  );

}

export default JobDetails;