import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import usePortfolio from "../../hooks/usePortfolio";

function Home2() {
  const { data } = usePortfolio();
  const about = data?.about;
  const settings = data?.siteSettings;

  const intro =
    about?.intro_text ||
    "System Engineer (SOC) focused on uptime, reliability, and building scalable products across the stack.";

  const highlight = about?.title || settings?.hero_subtitle || "Full Stack Developer";

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              {intro}
              <br />
              <br />
              I focus on
              <i>
                <b className="purple"> {highlight}</b>
              </i>
              , delivering clean architecture, automation, and dependable deployments.
              <br />
              <br />
              When possible, I ship with
              <b className="purple"> Node.js </b> plus modern frameworks like{" "}
              <i>
                <b className="purple">React.js</b> and <b className="purple">Next.js</b>.
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={about?.profile_image || myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
