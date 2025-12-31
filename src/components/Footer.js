import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import usePortfolio from "../hooks/usePortfolio";

function Footer() {
  const { data } = usePortfolio();
  const date = new Date();
  const year = date.getFullYear();
  const about = data?.about;
  const settings = data?.siteSettings;

  const socials = useMemo(
    () => [
      { icon: <AiOutlineTwitter />, url: about?.twitter || settings?.twitter_url },
      { icon: <FaLinkedinIn />, url: about?.linkedin || settings?.linkedin_url },
      { icon: <AiFillInstagram />, url: settings?.instagram_url },
    ].filter((item) => Boolean(item.url)),
    [about, settings]
  );

  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and developed by {about?.name || settings?.site_name || "Portfolio"}</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} {about?.name?.split(" ")[0] || "MJ"}</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            {socials.length ? (
              socials.map((item, idx) => (
                <li className="social-icons" key={idx}>
                  <a
                    href={item.url}
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.icon}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-muted small">Add socials in admin to show links here.</li>
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
