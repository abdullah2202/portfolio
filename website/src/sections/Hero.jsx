import Container from "../components/Container";
import Button from "../components/Button";

export default function Hero({ projectCount }) {
  return (
    <section className="hero" aria-label="Intro">
      <Container className="heroGrid">
        <div className="heroCopy">
          <p className="pill">DevOps Engineer • AWS • Terraform • CI/CD</p>
          <h1>Building reliable delivery pipelines and cloud infrastructure.</h1>
          <p className="lead">
            I design and automate cloud-native platforms with Infrastructure as Code,
            GitHub Actions pipelines, and scalable AWS architectures.
          </p>

          <div className="heroActions">
            <Button href="#projects">View Projects</Button>
            <Button variant="ghost" href="https://github.com/abdullah2202">
              GitHub Profile
            </Button>
          </div>

          <div className="stats" aria-label="Highlights">
            <div className="stat">
              <div className="statNum">{projectCount}</div>
              <div className="statLabel">Projects</div>
            </div>
            <div className="stat">
              <div className="statNum">AWS</div>
              <div className="statLabel">Cloud Focus</div>
            </div>
            <div className="stat">
              <div className="statNum">IaC</div>
              <div className="statLabel">Terraform</div>
            </div>
          </div>
        </div>

        <aside className="heroCard">
          <div className="card">
            <div className="cardHeader">
              <h2>Current Stack</h2>
              <p>This site is deployed as a DevOps project</p>
            </div>
            <ul className="list">
              <li><span className="dot"></span> Vite + React build</li>
              <li><span className="dot"></span> S3 (private) hosts build output</li>
              <li><span className="dot"></span> CloudFront (CDN + HTTPS)</li>
              <li><span className="dot"></span> Terraform provisions infrastructure</li>
              <li><span className="dot"></span> GitHub Actions deploys on push</li>
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
