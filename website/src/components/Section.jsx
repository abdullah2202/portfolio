import Container from "./Container";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <Container>
        <div className="sectionHeader">
          <h2>{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}
