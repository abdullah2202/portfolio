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
        I’m a DevOps engineer focused on AWS infrastructure, Terraform, and CI/CD automation. I enjoy turning “runbooks” into pipelines so deployments are repeatable, environments are consistent, and teams spend less time on manual ops.
      </p>
      <p className="muted">
        This portfolio is intentionally built as an infrastructure project: Terraform-managed AWS resources, staged releases (dev → prod), and GitHub Actions deployments.
      </p>
      <p className="muted">
        I’m comfortable in Linux environments and enjoy improving reliability through clear monitoring/logging and least-privilege IAM.
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
