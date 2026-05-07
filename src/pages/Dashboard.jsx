import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API_URL from "../config/api";

const emptyProject = {
  title: "",
  tech: "",
  image: "",
  link: "",
};

const emptySkill = {
  name: "",
};

const emptyCertificate = {
  title: "",
  image: "",
  link: "",
};

const emptyPassword = {
  currentPassword: "",
  newPassword: "",
};

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [certificateForm, setCertificateForm] = useState(emptyCertificate);
  const [passwordForm, setPasswordForm] = useState(emptyPassword);
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token");
  const authHeaders = {
    Authorization: token || "",
  };

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        const [projectRes, skillRes, certificateRes, messageRes] = await Promise.all([
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/skills`),
          fetch(`${API_URL}/api/certificates`),
          fetch(`${API_URL}/api/contact`, { headers: { Authorization: token || "" } }),
        ]);

        const [projectData, skillData, certificateData, messageData] = await Promise.all([
          projectRes.json(),
          skillRes.json(),
          certificateRes.json(),
          messageRes.json(),
        ]);

        if (!ignore) {
          setProjects(projectData);
          setSkills(skillData);
          setCertificates(certificateData);
          setMessages(messageRes.ok ? messageData : []);
        }
      } catch {
        if (!ignore) {
          setStatus("Could not load dashboard data");
        }
      }
    };

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, [token]);

  const updateForm = (setter) => (e) => {
    setter((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const addProject = async (e) => {
    e.preventDefault();
    setStatus("Saving project...");

    const res = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(projectForm),
    });

    const project = await res.json();

    if (!res.ok) {
      setStatus(project.message || "Could not save project");
      return;
    }

    setProjects((currentProjects) => [project, ...currentProjects]);
    setProjectForm(emptyProject);
    setStatus("Project added");
  };

  const addSkill = async (e) => {
    e.preventDefault();
    setStatus("Saving skill...");

    const res = await fetch(`${API_URL}/api/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(skillForm),
    });

    const skill = await res.json();

    if (!res.ok) {
      setStatus(skill.message || "Could not save skill");
      return;
    }

    setSkills((currentSkills) => [skill, ...currentSkills]);
    setSkillForm(emptySkill);
    setStatus("Skill added");
  };

  const addCertificate = async (e) => {
    e.preventDefault();
    setStatus("Saving certificate...");

    const res = await fetch(`${API_URL}/api/certificates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(certificateForm),
    });

    const certificate = await res.json();

    if (!res.ok) {
      setStatus(certificate.message || "Could not save certificate");
      return;
    }

    setCertificates((currentCertificates) => [certificate, ...currentCertificates]);
    setCertificateForm(emptyCertificate);
    setStatus("Certificate added");
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setStatus("Changing password...");

    const res = await fetch(`${API_URL}/api/admin/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(passwordForm),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data.message || "Could not change password");
      return;
    }

    setPasswordForm(emptyPassword);
    setStatus(data.message || "Password changed");
  };

  const deleteItem = async (endpoint, id, setter, successMessage) => {
    const res = await fetch(`${API_URL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    if (!res.ok) {
      setStatus("Could not delete item");
      return;
    }

    setter((items) => items.filter((item) => item._id !== id));
    setStatus(successMessage);
  };

  return (
    <main className="dashboard-shell">
      <Sidebar />

      <section className="dashboard-page">
        <div className="dashboard-header">
          <p className="eyebrow">Admin</p>
          <h1>Portfolio Dashboard</h1>
        </div>

        {status && <p className="form-status">{status}</p>}

        <div className="admin-section-grid">
          <form className="admin-form" id="projects-admin" onSubmit={addProject}>
            <h2>Add Project</h2>
            <input
              name="title"
              onChange={updateForm(setProjectForm)}
              placeholder="Project title"
              required
              value={projectForm.title}
            />
            <input
              name="tech"
              onChange={updateForm(setProjectForm)}
              placeholder="Tech stack"
              required
              value={projectForm.tech}
            />
            <input
              name="image"
              onChange={updateForm(setProjectForm)}
              placeholder="Image path, for example /portfolio.png"
              value={projectForm.image}
            />
            <input
              name="link"
              onChange={updateForm(setProjectForm)}
              placeholder="Project link"
              value={projectForm.link}
            />
            <button className="btn-main" type="submit">Add Project</button>
          </form>

          <form className="admin-form" id="skills-admin" onSubmit={addSkill}>
            <h2>Add Skill</h2>
            <input
              name="name"
              onChange={updateForm(setSkillForm)}
              placeholder="Skill name"
              required
              value={skillForm.name}
            />
            <button className="btn-main" type="submit">Add Skill</button>
          </form>

          <form className="admin-form" id="certificates-admin" onSubmit={addCertificate}>
            <h2>Add Certificate</h2>
            <input
              name="title"
              onChange={updateForm(setCertificateForm)}
              placeholder="Certificate title"
              required
              value={certificateForm.title}
            />
            <input
              name="image"
              onChange={updateForm(setCertificateForm)}
              placeholder="Image path, for example /udemyjs.jpeg"
              required
              value={certificateForm.image}
            />
            <input
              name="link"
              onChange={updateForm(setCertificateForm)}
              placeholder="Certificate link"
              value={certificateForm.link}
            />
            <button className="btn-main" type="submit">Add Certificate</button>
          </form>

          <form className="admin-form" id="password-admin" onSubmit={changePassword}>
            <h2>Change Password</h2>
            <input
              name="currentPassword"
              onChange={updateForm(setPasswordForm)}
              placeholder="Current password"
              required
              type="password"
              value={passwordForm.currentPassword}
            />
            <input
              name="newPassword"
              onChange={updateForm(setPasswordForm)}
              placeholder="New password"
              required
              type="password"
              value={passwordForm.newPassword}
            />
            <button className="btn-main" type="submit">Update Password</button>
          </form>
        </div>

        <section className="dashboard-section" id="messages-admin">
          <div className="dashboard-section-title">
            <h2>Viewer Messages</h2>
            <span>{messages.length} total</span>
          </div>

          <div className="message-list">
            {messages.length === 0 && <p className="empty-state">No messages yet.</p>}
            {messages.map((message) => (
              <article key={message._id} className="message-card">
                <div>
                  <h3>{message.name}</h3>
                  <a href={`mailto:${message.email}`}>{message.email}</a>
                </div>
                <p>{message.message}</p>
                <small>
                  {message.createdAt ? new Date(message.createdAt).toLocaleString() : "New message"}
                </small>
                <button
                  type="button"
                  onClick={() =>
                    deleteItem("/api/contact", message._id, setMessages, "Message deleted")
                  }
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-title">
            <h2>Projects</h2>
            <span>{projects.length} total</span>
          </div>

          <div className="dashboard-grid">
            {projects.map((project) => (
              <article key={project._id} className="dashboard-project">
                <img src={project.image || "/portfolio.png"} alt={project.title} />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.tech}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    deleteItem("/api/projects", project._id, setProjects, "Project deleted")
                  }
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-title">
            <h2>Skills</h2>
            <span>{skills.length} total</span>
          </div>

          <div className="admin-chip-list">
            {skills.map((skill) => (
              <span key={skill._id} className="admin-chip">
                {skill.name}
                <button
                  type="button"
                  onClick={() => deleteItem("/api/skills", skill._id, setSkills, "Skill deleted")}
                >
                  Delete
                </button>
              </span>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-title">
            <h2>Certificates</h2>
            <span>{certificates.length} total</span>
          </div>

          <div className="dashboard-grid">
            {certificates.map((certificate) => (
              <article key={certificate._id} className="dashboard-project">
                <img src={certificate.image} alt={certificate.title} />
                <div>
                  <h3>{certificate.title}</h3>
                  {certificate.link && <p>{certificate.link}</p>}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    deleteItem(
                      "/api/certificates",
                      certificate._id,
                      setCertificates,
                      "Certificate deleted"
                    )
                  }
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
