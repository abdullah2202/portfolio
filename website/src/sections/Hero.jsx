import Container from "../components/Container";
import Button from "../components/Button";

export default function Hero({ projectCount }) {
  return (
    <section className="hero" aria-label="Intro">
      <Container className="heroGrid">
        <div className="heroCopy">
          <p className="pill">DevOps Engineer • AWS • Terraform • CI/CD</p>
          <h1>I build repeatable AWS infrastructure and CI/CD that ships safely.</h1>
          <p className="lead">
            I automate cloud infrastructure with Terraform and deliver fast, reliable deployments with GitHub Actions. I care about clean IaC, staged releases, and practical security (least privilege, HTTPS, and reproducible environments).
          </p>

          <div className="heroActions">
            <Button href="#projects">View Projects</Button>
            <Button variant="ghost" href="https://github.com/abdullah2202">
              GitHub (code + pipelines)
            </Button>
          </div>

          <div className="stats" aria-label="Highlights">
            <div className="stat">
              <div className="statNum">Staged releases</div>
              <div className="statLabel">dev → prod workflow</div>
            </div>
            <div className="stat">
              <div className="statNum">AWS + IaC</div>
              <div className="statLabel">Terraform-first builds</div>
            </div>
            <div className="stat">
              <div className="statNum">CI/CD</div>
              <div className="statLabel">GitHub Actions deployments</div>
            </div>
          </div>
        </div>

        <aside className="heroCard">
          <div className="card">
            <div className="cardHeader">
              <h2>Current Stack</h2>
              <p>This website is deployed like a real DevOps project (IaC + CI/CD).</p>
            </div>
            <ul className="list">
              <li><span className="dot"></span> Vite + React build output</li>
              <li><span className="dot"></span> S3 hosts static site artifacts (private)</li>
              <li><span className="dot"></span> CloudFront for (CDN + HTTPS)</li>
              <li><span className="dot"></span> ACM certificates for TLS</li>
              <li><span className="dot"></span> Terraform provisions everything</li>
              <li><span className="dot"></span> GitHub Actions deploys on push + invalidate cache</li>
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
