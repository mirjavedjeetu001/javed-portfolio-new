import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import usePortfolio from "../../hooks/usePortfolio";
import ReactIcon from "../../Assets/TechIcons/React.svg";
import Node from "../../Assets/TechIcons/Node.svg";
import Typescript from "../../Assets/TechIcons/Typescript.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import Tailwind from "../../Assets/TechIcons/Tailwind.svg";

const fallbackSkills = [
  { name: "React", icon: ReactIcon },
  { name: "Node.js", icon: Node },
  { name: "TypeScript", icon: Typescript },
  { name: "Docker", icon: Docker },
  { name: "TailwindCSS", icon: Tailwind },
];

function Techstack() {
  const { data } = usePortfolio();
  const professionalSkills = data?.professionalSkills || [];

  const skillsToRender = useMemo(() => {
    if (professionalSkills.length) return professionalSkills;
    return fallbackSkills;
  }, [professionalSkills]);

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {skillsToRender.map((skill, idx) => (
        <Col xs={4} md={2} className="tech-icons" key={`${skill.name}-${idx}`}>
          {skill.icon ? (
            <img src={skill.icon} alt={skill.name} className="tech-icon-images" />
          ) : (
            <div className="tech-icon-images text-center fw-bold">{skill.name?.[0] || "?"}</div>
          )}
          <div className="tech-icons-text">{skill.name}</div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
