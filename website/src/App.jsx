import projects from "./projects.json";
import "./styles.css";

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="sectionHeader">
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const projectCount = projects?.length ?? 0;

  return (
    <div id="top">
      <header className="topbar">
        <div className="container topbarInner">
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
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <p className="pill">DevOps Engineer • AWS • Terraform • CI/CD</p>
              <h1>Building reliable delivery pipelines and cloud infrastructure.</h1>
              <p className="lead">
                I design and automate cloud-native platforms with Infrastructure as Code,
                GitHub Actions pipelines, and scalable AWS architectures.
              </p>

              <div className="heroActions">
                <a className="btn btnPrimary" href="#projects">View Projects</a>
                <a
                  className="btn btnGhost"
                  href="https://github.com/abdullah2202"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Profile
                </a>
              </div>

              <div className="stats">
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
                  <p>What this portfolio is built explained as a DevOps project</p>
                </div>
                <ul className="list">
                  <li><span className="dot"></span> S3 (private) hosts build output</li>
                  <li><span className="dot"></span> CloudFront (CDN + HTTPS)</li>
                  <li><span className="dot"></span> Terraform provisions infra</li>
                  <li><span className="dot"></span> GitHub Actions deploys on push</li>
                  <li><span className="dot"></span> feature → dev → main promotion</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <Section id="projects" title="Projects">
          <p className="muted">Selected projects from my GitHub.</p>

          <div className="grid">
            {projects.map((p) => (
              <article key={p.github} className="project">
                <div className="projectTop">
                  <h3>{p.name}</h3>
                  <span className="badge">GitHub</span>
                </div>
                <p className="projectDesc">{p.description}</p>
                <div className="projectActions">
                  <a className="link" href={p.github} target="_blank" rel="noreferrer">
                    View repo →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="pipeline" title="Pipeline & Infrastructure">
          <div className="pipeline">
            <div className="card">
              <h3>How deployments work</h3>
              <ul className="pipelineList">
                <li><span className="dot dotAccent"></span> Create feature branch from <strong>dev</strong></li>
                <li><span className="dot dotAccent"></span> PR to <strong>dev</strong> deploys to <strong>dev.mabdullah.dev</strong></li>
                <li><span className="dot dotAccent"></span> PR to <strong>main</strong> deploys to <strong>mabdullah.dev</strong></li>
                <li><span className="dot dotAccent"></span> Deploy uses <strong>npm build</strong> + <strong>aws s3 sync</strong> + invalidation</li>
              </ul>

              <div className="chips">
                <span className="chip">Terraform</span>
                <span className="chip">GitHub Actions</span>
                <span className="chip">Vite + React</span>
                <span className="chip">S3</span>
                <span className="chip">CloudFront</span>
                <span className="chip">ACM</span>
              </div>
            </div>

            <div className="card diagram">
              <svg viewBox="0 0 980 420" role="img" aria-label="CI/CD and AWS architecture diagram">
                <g>
                  <rect x="40" y="50" width="260" height="140" rx="18" className="svgBox" />
                  <text x="70" y="92" className="svgTitle">GitHub</text>
                  <text x="70" y="124" className="svgText">feature/* → dev → main</text>
                  <text x="70" y="150" className="svgText">PR checks + reviews</text>

                  <rect x="360" y="50" width="260" height="140" rx="18" className="svgBox" />
                  <text x="390" y="92" className="svgTitle">GitHub Actions</text>
                  <text x="390" y="124" className="svgText">npm ci + npm run build</text>
                  <text x="390" y="150" className="svgText">s3 sync + invalidation</text>

                  <rect x="680" y="30" width="260" height="180" rx="18" className="svgBox" />
                  <text x="710" y="72" className="svgTitle">AWS</text>

                  <rect x="710" y="92" width="200" height="44" rx="14" className="svgBox2" />
                  <text x="730" y="120" className="svgText">S3 (build output)</text>

                  <rect x="710" y="144" width="200" height="44" rx="14" className="svgBox2" />
                  <text x="730" y="172" className="svgText">CloudFront (CDN + HTTPS)</text>

                  <rect x="360" y="260" width="580" height="110" rx="18" className="svgBox2" />
                  <text x="390" y="302" className="svgTitleSmall">Users</text>
                  <text x="390" y="332" className="svgText">dev.mabdullah.dev • mabdullah.dev</text>

                  <path d="M300 120 C320 120, 340 120, 360 120" className="svgArrow"/>
                  <path d="M620 120 C640 120, 660 120, 680 120" className="svgArrow"/>
                  <path d="M810 210 C810 230, 760 250, 700 260" className="svgArrow"/>
                </g>
              </svg>
            </div>
          </div>
        </Section>

        <Section id="about" title="About">
          <p className="muted">
            I focus on practical DevOps: repeatable environments, secure-by-default infrastructure,
            and automation that reduces operational toil.
          </p>

          <div className="chips">
            <span className="chip">Terraform</span>
            <span className="chip">AWS</span>
            <span className="chip">CloudFront</span>
            <span className="chip">S3</span>
            <span className="chip">GitHub Actions</span>
            <span className="chip">Linux</span>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="card">
            <p className="muted">Want to chat about DevOps, Terraform, or CI/CD? Reach out.</p>
            <a className="btn btnPrimary" href="mailto:your.email@example.com">Email me</a>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <p>© {new Date().getFullYear()} Abdullah • Built with AWS + Terraform + GitHub Actions</p>
          <a href="#top" className="muted">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
