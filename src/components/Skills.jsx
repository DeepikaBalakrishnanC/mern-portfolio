import { useEffect, useState } from "react";
import { skills as fallbackSkills } from "../data/data";
import API_URL from "../config/api";

function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    let ignore = false;

    fetch(`${API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          const apiSkills = data.map((skill) => skill.name);
          setSkills([...new Set([...apiSkills, ...fallbackSkills])]);
        }
      })
      .catch(() => {
        setSkills(fallbackSkills);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <p className="eyebrow">Skills</p>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill} className="skill-card">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
