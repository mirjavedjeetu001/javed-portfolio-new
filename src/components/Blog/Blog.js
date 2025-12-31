import React, { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import usePortfolio from "../../hooks/usePortfolio";

function Blog() {
  const { data } = usePortfolio();
  const posts = useMemo(() => data?.blogPosts || [], [data]);
  const categories = useMemo(() => data?.categories || [], [data]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const visiblePosts = useMemo(() => {
    const published = posts.filter((p) => p.status !== "draft");
    if (categoryFilter === "all") return published;
    return published.filter((p) => String(p.categoryId) === String(categoryFilter));
  }, [posts, categoryFilter]);

  const getCategoryName = (id) => categories.find((c) => String(c.id) === String(id))?.name;

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div className="d-flex align-items-center mb-3">
          <div>
            <h1 className="project-heading mb-0">
              Blog <strong className="purple">Stories</strong>
            </h1>
            <p style={{ color: "white" }}>Insights, launches, and lessons learned.</p>
          </div>
          {categories.length > 0 ? (
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="ms-auto"
              style={{ maxWidth: 220 }}
              size="sm"
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          ) : null}
        </div>

        <Row className="gy-4" style={{ paddingBottom: "10px" }}>
          {visiblePosts.length ? (
            visiblePosts.map((post) => (
              <Col md={4} key={post.id}>
                <Card className="project-card-view h-100">
                  {post.featured_image ? (
                    <Card.Img variant="top" src={post.featured_image} alt={post.title} />
                  ) : null}
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      {post.featured ? <Badge bg="warning" text="dark" className="me-2">Featured</Badge> : null}
                      {post.reading_time ? (
                        <Badge bg="secondary">{post.reading_time} min read</Badge>
                      ) : null}
                    </div>
                    <Card.Title>{post.title}</Card.Title>
                    {post.published_at ? (
                      <div className="text-white small mb-2">
                        {new Date(post.published_at).toLocaleDateString()}
                      </div>
                    ) : null}
                    {post.categoryId ? (
                      <Badge bg="info" className="mb-2">{getCategoryName(post.categoryId) || "Category"}</Badge>
                    ) : null}
                    <Card.Text className="text-muted" style={{ minHeight: 80 }}>
                      {post.excerpt || (post.content || "").slice(0, 160)}
                      {post.content && post.content.length > 160 ? "..." : ""}
                    </Card.Text>
                    <Button as={Link} to={`/blog/${post.slug || post.id}`} variant="link" size="sm" className="p-0">
                      Continue reading →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-white">No published posts yet. Create one from the admin panel.</div>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Blog;
