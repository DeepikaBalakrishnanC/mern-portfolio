import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

// Your existing components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <footer className="footer">
        © 2026 Deepika Balakrishnan C | MERN Stack Developer Portfolio
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main portfolio */}
        <Route path="/" element={<Home />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
