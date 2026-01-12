import Container from "./Container";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footerInner">
        <p>© {new Date().getFullYear()} Abdullah • Built with AWS + Terraform + GitHub Actions</p>
        <a href="#top" className="muted">Back to top</a>
      </Container>
    </footer>
  );
}
