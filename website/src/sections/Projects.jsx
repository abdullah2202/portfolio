import Section from "../components/Section";

export default function Projects({ projects }) {
  return (
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
  );
}
