import Section from "../components/Section";
import Chip from "../components/Chip";

export default function Pipeline() {
  return (
    <Section
      id="pipeline"
      title="Pipeline & Infrastructure"
      subtitle="IaC + CI/CD + AWS edge delivery."
    >
      <div className="pipeline">
        <div className="card">
          <h3>How deployments work</h3>
          <ul className="pipelineList">
            <li><span className="dot dotAccent"></span> Create feature branch from <strong>dev</strong></li>
            <li><span className="dot dotAccent"></span> PR to <strong>dev</strong> deploys to <strong>dev.mabdullah.dev</strong></li>
            <li><span className="dot dotAccent"></span> PR to <strong>main</strong> deploys to <strong>mabdullah.dev</strong></li>
            <li><span className="dot dotAccent"></span> Build + sync to S3 + CloudFront invalidation</li>
          </ul>

          <div className="chips">
            <Chip>Terraform</Chip>
            <Chip>GitHub Actions</Chip>
            <Chip>Vite + React</Chip>
            <Chip>S3</Chip>
            <Chip>CloudFront</Chip>
            <Chip>ACM</Chip>
          </div>
        </div>

        <div className="card diagram" aria-label="CI/CD diagram">
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
  );
}
