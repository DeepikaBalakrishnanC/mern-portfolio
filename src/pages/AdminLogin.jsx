import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
    <section className="auth-page">
      <h2>Admin Login</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="email"
          value={form.email}
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          value={form.password}
        />

        {error && <p className="form-status error">{error}</p>}

        <button className="btn-main" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default AdminLogin;
