import { motion } from "framer-motion";

function ProjectCard({ project, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "20px",
        borderRadius: "16px"
      }}
    >
      <h3>{project.title}</h3>
      <p>{project.tech}</p>

      <button onClick={() => onDelete(project._id)}>
        Delete
      </button>
    </motion.div>
  );
}

export default ProjectCard;