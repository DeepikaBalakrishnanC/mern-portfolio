import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I'm{" "}
          <span className="gradient-text">
            Deepika Balakrishnan C
          </span>
        </motion.h1>

        {/* Role Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          MERN Stack Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hero-text"
        >
          Front-end focused full stack developer building scalable,
          maintainable, and user-focused web applications with React,
          Node.js, Express, and MongoDB.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hero-actions"
        >
          <a className="btn-main" href="/Deepika-Balakrishnan-C-Resume.pdf" download>
            Download Resume
          </a>
          <a className="btn-secondary" href="#projects">
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="social-links"
        >
          <a href="https://github.com/DeepikaBalakrishnanC" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/deepika-balakrishnan-c" target="_blank" rel="noreferrer">LinkedIn</a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="hero-portrait"
      >
        <img src="/profile.jpeg" alt="Deepika Balakrishnan C" />
      </motion.div>
    </section>
  );
}

export default Hero;
