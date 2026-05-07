const navItems = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "messages", label: "Messages" },
  { id: "password", label: "Password" },
];

function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="sidebar">
      <div>
        <p className="sidebar-kicker">Admin</p>
        <h2>Portfolio Control</h2>
      </div>

      <nav className="sidebar-nav" aria-label="Admin sections">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeView === item.id ? "active" : ""}
            type="button"
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <a className="sidebar-home" href="/">
        Back to Portfolio
      </a>
    </aside>
  );
}

export default Sidebar;
