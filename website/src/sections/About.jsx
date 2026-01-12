import Section from "../components/Section";
import Chip from "../components/Chip";

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="A practical DevOps approach: repeatable infra and automated delivery."
    >
      <p className="muted">
        I focus on building secure, reproducible AWS infrastructure and CI/CD pipelines that
        reduce operational toil. This portfolio is designed to demonstrate how I work in real projects:
        Infrastructure as Code, staged releases, and automated deployments.
      </p>

      <div className="chips">
        <Chip>Terraform</Chip>
        <Chip>AWS</Chip>
        <Chip>S3</Chip>
        <Chip>CloudFront</Chip>
        <Chip>ACM</Chip>
        <Chip>GitHub Actions</Chip>
        <Chip>Linux</Chip>
      </div>
    </Section>
  );
}
