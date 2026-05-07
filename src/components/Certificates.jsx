import { certificates } from "../data/data";

function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="section-inner">
        <p className="eyebrow">Certificates</p>
        <h2>Learning milestones.</h2>

        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <figure key={certificate.title} className="certificate-card">
              <img src={certificate.image} alt={certificate.title} />
              <figcaption>{certificate.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
