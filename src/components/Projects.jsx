import { useEffect, useState } from "react";
import { projects as fallbackProjects } from "../data/data";
import API_URL from "../config/api";

function Projects() {

  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    let ignore = false;
    const mergeProjects = (apiProjects) => {
      const byTitle = new Map();

      [...apiProjects, ...fallbackProjects].forEach((project) => {
        byTitle.set(project.title, project);
      });

      return Array.from(byTitle.values());
    };

    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setProjects(mergeProjects(data));
        }
      })
      .catch(() => {
        setProjects(fallbackProjects);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="projects" className="section section-soft">
      <div className="section-inner">
        <p className="eyebrow">Projects</p>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project._id || project.title} className="project-card">
              <img src={project.image || "/portfolio.png"} alt={project.title} />

              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.tech}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View project
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
