import { useState } from "react";
import API_URL from "../config/api";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Message failed");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("Message sent. Thank you!");
    } catch {
      setStatus("Could not send right now. Please try again.");
    }
  };

  return (
    <section id="contact" className="section section-soft">
      <div className="section-inner narrow">
        <p className="eyebrow">Contact</p>
        <h2>Let’s build something useful.</h2>
        <a className="contact-email" href="mailto:deepika.chembra18@gmail.com">
          deepika.chembra18@gmail.com
        </a>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            required
            value={form.name}
          />
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
            value={form.email}
          />
          <textarea
            name="message"
            onChange={handleChange}
            placeholder="Message"
            required
            rows="5"
            value={form.message}
          />

          <button className="btn-main" type="submit">Send Message</button>
        </form>

        {status && <p className="form-status">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;
