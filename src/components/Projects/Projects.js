import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import usePortfolio from "../../hooks/usePortfolio";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";

const fallbackProjects = [
  {
    title: "Chatify",
    description:
      "Personal chat workspace with real-time messaging, image sharing, and reactions built with React and Firebase.",
    github_url: "",
    demo_url: "",
    image: chatify,
  },
  {
    title: "Editor.io",
    description:
      "Online HTML/CSS/JS playground and markdown editor with live preview and autosave.",
    github_url: "",
    demo_url: "",
    image: editor,
  },
  {
    title: "Plant AI",
    description:
      "Leaf disease classifier using PyTorch and transfer learning (ResNet34) with 98% accuracy.",
    github_url: "",
    demo_url: "",
    image: leaf,
  },
];

function Projects() {
  const { data } = usePortfolio();

  const projects = useMemo(() => {
    if (data?.projects?.length) return data.projects;
    return fallbackProjects;
  }, [data]);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project) => (
            <Col md={4} className="project-card" key={project.id || project.slug || project.title}>
              <ProjectCard
                imgPath={project.image || leaf}
                isBlog={false}
                title={project.title}
                description={project.description}
                ghLink={project.github_url}
                demoLink={project.demo_url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
