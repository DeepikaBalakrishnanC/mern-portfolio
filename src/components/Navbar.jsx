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
        <a className="admin-link" href="/admin">Admin</a>
      </div>
    </nav>
  );
}

export default Navbar;
