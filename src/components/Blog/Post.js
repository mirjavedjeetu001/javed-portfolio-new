import React, { useMemo } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Particle from "../Particle";
import usePortfolio from "../../hooks/usePortfolio";

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data } = usePortfolio();
  const posts = useMemo(() => data?.blogPosts || [], [data]);
  const categories = useMemo(() => data?.categories || [], [data]);

  const post = useMemo(
    () => posts.find((p) => String(p.slug) === slug || String(p.id) === slug),
    [posts, slug]
  );

  const category = post ? categories.find((c) => String(c.id) === String(post.categoryId)) : null;

  if (!post) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Post not found</Card.Title>
              <p className="text-white">The article you're looking for doesn't exist or isn't published.</p>
              <Button variant="primary" onClick={() => navigate(-1)}>
                Go back
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-sm">
              {post.featured_image ? <Card.Img variant="top" src={post.featured_image} alt={post.title} /> : null}
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {post.featured ? <Badge bg="warning" text="dark" className="me-2">Featured</Badge> : null}
                  {post.reading_time ? <Badge bg="secondary" className="me-2">{post.reading_time} min read</Badge> : null}
                  {category ? <Badge bg="info">{category.name}</Badge> : null}
                  {post.published_at ? (
                    <div className="text-white small ms-auto">
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>
                  ) : null}
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text className="text-white">{post.excerpt}</Card.Text>
                <div style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>{post.content}</div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Button as={Link} to="/blog" variant="outline-secondary" size="sm">
                    ← Back to blog
                  </Button>
                  <div className="text-white small">{data?.about?.name || data?.siteSettings?.site_name}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default BlogPost;
