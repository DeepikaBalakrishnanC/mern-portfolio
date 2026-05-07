function Navbar() {
  const links = ["about", "skills", "projects", "certificates", "contact"];

  return (
    <nav className="navbar">
      <a className="brand" href="#home">Deepika Balakrishnan C</a>

      <div className="nav-links">
        {links.map((link) => (
          <a key={link} href={`#${link}`}>
            {link}
          </a>
        ))}
        <a className="admin-link" href="/admin" aria-label="Admin login" title="Admin login">
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            viewBox="0 0 24 24"
            width="18"
          >
            <path
              d="M7 11V8a5 5 0 0 1 10 0v3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M6 11h12v9H6z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
