import { useEffect, useState } from "react";
import { certificates as fallbackCertificates } from "../data/data";
import API_URL from "../config/api";

function Certificates() {
  const [certificates, setCertificates] = useState(fallbackCertificates);

  useEffect(() => {
    let ignore = false;

    const mergeCertificates = (apiCertificates) => {
      const byTitle = new Map();

      [...apiCertificates, ...fallbackCertificates].forEach((certificate) => {
        byTitle.set(certificate.title, certificate);
      });

      return Array.from(byTitle.values());
    };

    fetch(`${API_URL}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setCertificates(mergeCertificates(data));
        }
      })
      .catch(() => {
        setCertificates(fallbackCertificates);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="certificates" className="section">
      <div className="section-inner">
        <p className="eyebrow">Certificates</p>
        <h2>Learning milestones.</h2>

        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <figure key={certificate._id || certificate.title} className="certificate-card">
              <img src={certificate.image} alt={certificate.title} />
              <figcaption>
                {certificate.link ? (
                  <a href={certificate.link} target="_blank" rel="noreferrer">
                    {certificate.title}
                  </a>
                ) : (
                  certificate.title
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
