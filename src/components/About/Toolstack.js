import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import usePortfolio from "../../hooks/usePortfolio";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import intelliJ from "../../Assets/TechIcons/intellij-idea.svg";

const fallbackTools = [
  { name: "VS Code", icon: vsCode },
  { name: "IntelliJ", icon: intelliJ },
];

function Toolstack() {
  const { data } = usePortfolio();
  const tools = data?.tools || [];

  const toolsToRender = useMemo(() => {
    if (tools.length) return tools;
    return fallbackTools;
  }, [tools]);

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {toolsToRender.map((tool, idx) => (
        <Col xs={4} md={2} className="tech-icons" key={`${tool.name}-${idx}`}>
          {tool.icon ? (
            <img src={tool.icon} alt={tool.name} className="tech-icon-images" />
          ) : (
            <div className="tech-icon-images text-center fw-bold">{tool.name?.[0] || "?"}</div>
          )}
          <div className="tech-icons-text">{tool.name}</div>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
