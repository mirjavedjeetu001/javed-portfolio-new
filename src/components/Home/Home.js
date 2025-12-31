import React, { useMemo } from "react";
import { Badge, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Contact from "../Contact/Contact";
import { Link } from "react-router-dom";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import usePortfolio from "../../hooks/usePortfolio";

function Home() {
  const { data, loading, error } = usePortfolio();
  const about = data?.about;
  const settings = data?.siteSettings;
  const experiences = useMemo(() => data?.experience || [], [data]);
  const education = useMemo(() => data?.education || [], [data]);
  const blogPosts = useMemo(() => data?.blogPosts || [], [data]);
  const testimonials = useMemo(() => data?.testimonials || [], [data]);
  const certifications = useMemo(() => data?.certifications || [], [data]);

  const titles = useMemo(() => {
    if (about?.titles_list) {
      return about.titles_list.split(/[\,\n]/).map((item) => item.trim()).filter(Boolean);
    }
    return ["System Engineer", "Full Stack Developer", "DevOps Engineer"];
  }, [about]);

  const socials = useMemo(
    () => [
      { icon: <AiOutlineTwitter />, url: about?.twitter || settings?.twitter_url },
      { icon: <FaLinkedinIn />, url: about?.linkedin || settings?.linkedin_url },
      { icon: <AiFillInstagram />, url: settings?.instagram_url },
    ].filter((item) => Boolean(item.url)),
    [about, settings]
  );

  const heroImage = settings?.hero_background_image || about?.profile_image || homeLogo;
  const heroTitle = settings?.hero_title || about?.greeting || "Hi There!";
  const heroSubtitle = settings?.hero_subtitle || about?.name || "Mir Javed";
  const heroDescription = settings?.hero_description || about?.intro_text || about?.bio || "";

  const latestPosts = useMemo(() => {
    if (!blogPosts.length) return [];
    return blogPosts.filter((p) => p.status !== "draft").slice(0, 3);
  }, [blogPosts]);

  const formatRange = (item) => {
    const start = item.start_date ? new Date(item.start_date).toLocaleDateString() : "";
    const end = item.end_date ? new Date(item.end_date).toLocaleDateString() : "Present";
    return `${start} - ${end}`.trim();
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {heroTitle} {" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                <strong className="main-name">{heroSubtitle}</strong>
              </h1>

              {heroDescription && <p className="text-light mt-3 mb-0" style={{ maxWidth: 520 }}>{heroDescription}</p>}

              <div style={{ padding: 50, textAlign: "left" }}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <Type strings={titles} />
                )}
                {error && <div className="text-danger mt-2 small">{error}</div>}
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={heroImage}
                alt="home"
                className="img-fluid"
                style={{ maxHeight: "450px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />

      <Container id="experience" className="py-5">
        <h2 className="project-heading text-center pb-3">
          Experience & <span className="purple">Leadership</span>
        </h2>
        <Row className="gy-4">
          {experiences.length ? (
            experiences.map((exp) => (
              <Col md={6} key={exp.id}>
                <Card className="project-card-view h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="mb-1 text-white">{exp.position}</Card.Title>
                        <div className="text-light">{exp.company}</div>
                      </div>
                      <Badge bg="secondary">{formatRange(exp)}</Badge>
                    </div>
                    <div className="mt-2 text-light small">{exp.location}</div>
                    <Card.Text className="mt-3 text-white" style={{ whiteSpace: "pre-line" }}>
                      {exp.description || "Add experience details in admin."}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-white text-center">Add your experience in the admin to showcase it here.</div>
            </Col>
          )}
        </Row>
      </Container>

      <Container id="education" className="py-5">
        <h2 className="project-heading text-center pb-3">
          Education <span className="purple">Highlights</span>
        </h2>
        <Row className="gy-4">
          {education.length ? (
            education.map((edu) => (
              <Col md={6} key={edu.id}>
                <Card className="project-card-view h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="mb-1 text-white">{edu.degree}</Card.Title>
                        <div className="text-light">{edu.institution}</div>
                      </div>
                      <Badge bg="secondary">{formatRange(edu)}</Badge>
                    </div>
                    <div className="mt-2 text-light small">{edu.field_of_study}</div>
                    <Card.Text className="mt-3 text-white" style={{ whiteSpace: "pre-line" }}>
                      {edu.description || "Add more details in admin."}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-white text-center">Share your education from admin to feature it here.</div>
            </Col>
          )}
        </Row>
      </Container>

      {certifications.length ? (
        <Container id="certifications" className="py-5">
          <h2 className="project-heading text-center pb-3">
            <span className="purple">Certifications</span> & Training
          </h2>
          <Row className="gy-4">
            {certifications.map((cert) => (
              <Col md={6} key={cert.id}>
                <Card className="project-card-view h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="mb-1 text-white">{cert.title || cert.degree}</Card.Title>
                        <div className="text-light">{cert.issuer || cert.institution}</div>
                      </div>
                      <Badge bg="secondary">{formatRange(cert)}</Badge>
                    </div>
                    <div className="mt-2 text-light small">{cert.field_of_study || cert.category}</div>
                    <Card.Text className="mt-3 text-white" style={{ whiteSpace: "pre-line" }}>
                      {cert.description || ""}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : null}

      <Container id="blog" className="py-5">
        <div className="d-flex align-items-center mb-3">
          <h2 className="project-heading mb-0">
            Latest <span className="purple">Articles</span>
          </h2>
          <Button as={Link} to="/blog" size="sm" variant="outline-primary" className="ms-auto">
            View all
          </Button>
        </div>
        <Row className="gy-4">
          {latestPosts.length ? (
            latestPosts.map((post) => (
              <Col md={4} key={post.id}>
                <Card className="project-card-view h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="secondary" className="me-2">
                        {post.reading_time ? `${post.reading_time} min read` : "Blog"}
                      </Badge>
                      {post.published_at ? (
                          <div className="text-light small">{new Date(post.published_at).toLocaleDateString()}</div>
                        ) : null}
                    </div>
                    <Card.Title className="text-white">{post.title}</Card.Title>
                      <Card.Text className="text-white" style={{ minHeight: 80 }}>
                      {post.excerpt || (post.content || "").slice(0, 140)}
                      {post.content && post.content.length > 140 ? "..." : ""}
                    </Card.Text>
                    <Button as={Link} to={`/blog/${post.slug || post.id}`} size="sm" variant="link" className="p-0 text-primary">
                      Read more →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-white">Publish a blog post from the admin to spotlight it here.</div>
            </Col>
          )}
        </Row>
      </Container>

      <Container>
        <h2 className="project-heading text-center pb-3">
          Words from <span className="purple">Clients</span>
        </h2>
        <Row className="gy-4" style={{ paddingBottom: "30px" }}>
          {testimonials.length ? (
            testimonials.slice(0, 3).map((t) => (
              <Col md={4} key={t.id}>
                <Card className="project-card-view h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      {t.image ? (
                        <img src={t.image} alt={t.name} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover" }} />
                      ) : null}
                      <div className="ms-2">
                        <div className="fw-bold text-white">{t.name}</div>
                        <div className="text-light small">{t.position} {t.company ? `• ${t.company}` : ""}</div>
                      </div>
                    </div>
                    <Card.Text className="text-white" style={{ whiteSpace: "pre-line" }}>
                      “{t.content || "Add testimonial content in admin."}”
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-white text-center">Testimonials you add in admin will be featured here.</div>
            </Col>
          )}
        </Row>
      </Container>

      <Contact />

      <Container style={{ paddingTop: "50px" }}>
        <Row style={{ paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              {socials.length ? (
                socials.map((item, idx) => (
                  <li className="social-icons" key={idx}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour  home-social-icons"
                    >
                      {item.icon}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-muted small">Add your social links in admin.</li>
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
