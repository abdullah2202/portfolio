import Section from "../components/Section";

export default function Projects({ projects }) {
  return (
    <Section id="projects" title="Projects">
      <p className="muted">
        Projects that demonstrate AWS infrastructure, Terraform IaC, and CI/CD automation.
      </p>

      <div className="grid">
        {projects.map((p) => (
          <article key={p.github} className="project">
            <div className="projectBody">
              <div className="projectTop">
                <h3>{p.name}</h3>
                <a
                  className="badge badgeLink"
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>

              <p className="projectDesc">{p.description}</p>

              {p.highlights?.length ? (
                <ul className="projectHighlights">
                  {p.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Stuck to bottom */}
            {p.stack?.length ? (
              <div className="projectChips" aria-label={`${p.name} stack`}>
                {p.stack.map((t) => (
                  <span key={t} className="chip chipSm">{t}</span>
                ))}
              </div>
            ) : null}
          </article>

        ))}
      </div>
    </Section>
  );
}
