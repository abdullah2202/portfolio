import Section from "../components/Section";
import Button from "../components/Button";

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Let’s talk DevOps, Terraform, or CI/CD."
    >
      <div className="card">
        <p className="muted">
          I’m open to DevOps Engineer roles. If you’d like to discuss an opportunity or review my work, email me or connect on LinkedIn.
        </p>

        <div className="heroActions">
          {/* Replace with your email */}
          <Button href="mailto:hire@mabdullah.dev">Email me</Button>
          <Button variant="ghost" href="#">LinkedIn</Button>
        </div>
      </div>
    </Section>
  );
}
