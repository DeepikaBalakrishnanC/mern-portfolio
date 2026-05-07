import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API_URL from "../config/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    tech: "",
    image: "",
    link: "",
  });
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    let ignore = false;

    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setProjects(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProject = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    const res = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify(form),
    });

    const project = await res.json();

    if (!res.ok) {
      setStatus(project.message || "Could not save project");
      return;
    }

    setProjects((currentProjects) => [project, ...currentProjects]);
    setForm({ title: "", tech: "", image: "", link: "" });
    setStatus("Project added");
  };

  const deleteProject = async (id) => {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      setStatus("Could not delete project");
      return;
    }

    setProjects((currentProjects) =>
      currentProjects.filter((project) => project._id !== id)
    );
    setStatus("Project deleted");
  };

  return (
    <main className="dashboard-shell">
      <Sidebar />

      <section className="dashboard-page">
        <div className="dashboard-header">
          <p className="eyebrow">Admin</p>
          <h1>Project Dashboard</h1>
        </div>

        <form className="admin-form" onSubmit={addProject}>
          <h2>Add Project</h2>
          <input
            name="title"
            onChange={handleChange}
            placeholder="Project title"
            required
            value={form.title}
          />
          <input
            name="tech"
            onChange={handleChange}
            placeholder="Tech stack"
            required
            value={form.tech}
          />
          <input
            name="image"
            onChange={handleChange}
            placeholder="Image path, for example /portfolio.png"
            value={form.image}
          />
          <input
            name="link"
            onChange={handleChange}
            placeholder="Project link"
            value={form.link}
          />
          <button className="btn-main" type="submit">Add Project</button>
        </form>

        {status && <p className="form-status">{status}</p>}

        <div className="dashboard-grid">
          {projects.map((project) => (
            <article key={project._id} className="dashboard-project">
              <img src={project.image || "/portfolio.png"} alt={project.title} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.tech}</p>
              </div>
              <button onClick={() => deleteProject(project._id)}>Delete</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
