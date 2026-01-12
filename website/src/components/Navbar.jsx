import Container from "./Container";

export default function Navbar() {
  return (
    <header className="topbar">
      <Container className="topbarInner">
        <a className="brand" href="#top">
          <span className="brandMark">A</span>
          <span className="brandText">mabdullah.dev</span>
        </a>

        <nav className="nav">
          <a href="#projects">Projects</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#about">About</a>
          <a href="#contact" className="navCta">
            Contact
          </a>
        </nav>
      </Container>
    </header>
  );
}
