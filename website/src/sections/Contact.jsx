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
          If you’d like to discuss an opportunity or collaborate on a project, feel free to reach out.
        </p>

        {/* Replace with your email */}
        <Button href="mailto:your.email@example.com">Email me</Button>
      </div>
    </Section>
  );
}
