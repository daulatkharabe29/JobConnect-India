import { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="container py-5">

      <h2 className="mb-4 text-center">📩 Contact Us</h2>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <form className="card p-4 shadow" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="form-control mb-3"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="form-control mb-3"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;