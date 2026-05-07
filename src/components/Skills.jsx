import { skills } from "../data/data";

function Skills() {
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
