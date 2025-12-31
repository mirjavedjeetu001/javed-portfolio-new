import React, { useMemo } from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import usePortfolio from "../../hooks/usePortfolio";

function AboutCard() {
  const { data } = usePortfolio();
  const about = data?.about;

  const hobbies = useMemo(() => {
    if (!about?.hobbies) return [];
    return about.hobbies.split(/[,\n]/).map((item) => item.trim()).filter(Boolean);
  }, [about]);

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {about?.bio || "Passionate builder focused on reliable systems, clean architecture, and delightful user experiences."}
            <br />
            <br />
            Outside of coding, I love engaging in activities that keep me
            creative and inspired:
          </p>

          <ul>
            {hobbies.length ? (
              hobbies.map((item, idx) => (
                <li className="about-activity" key={idx}>
                  <ImPointRight /> {item}
                </li>
              ))
            ) : (
              <li className="about-activity">
                <ImPointRight /> Learning new tools
              </li>
            )}
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            {about?.quote || "Strive to build things that make a difference!"}
          </p>
          <footer className="blockquote-footer">{about?.quote_author || about?.name || "Javed"}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
