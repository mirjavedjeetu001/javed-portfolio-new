import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import usePortfolio from "../../hooks/usePortfolio";
import api from "../../api/client";

function Contact() {
  const { data } = usePortfolio();
  const settings = data?.siteSettings;

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ variant: "danger", message: "Please fill all required fields." });
      return;
    }
    try {
      setSubmitting(true);
      await api.post("/public/contact", form);
      setStatus({ variant: "success", message: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message;
      setStatus({ variant: "danger", message: msg || "Failed to send message." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact-section">
      <Container className="py-5">
        <Row className="justify-content-center mb-4 text-center">
          <Col lg={8}>
            <h2 className="project-heading">Contact</h2>
            <p className="text-white">Send a message and it will appear in the Admin → Inbox.</p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <div className="p-4 h-100 bg-dark rounded-3 shadow-sm">
              <h4 className="text-white mb-3">Send a message</h4>
              {status && <Alert variant={status.variant}>{status.message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Subject *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={submitting}>
                    {submitting ? <Spinner animation="border" size="sm" /> : "Send Message"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-4 h-100 bg-dark rounded-3 shadow-sm text-white">
              <h4 className="mb-3">Contact info</h4>
              <ul className="list-unstyled">
                {settings?.contact_email && <li className="mb-2">Email: {settings.contact_email}</li>}
                {settings?.contact_phone && <li className="mb-2">Phone: {settings.contact_phone}</li>}
                {settings?.contact_address && <li className="mb-2">Address: {settings.contact_address}</li>}
              </ul>
              {!settings?.contact_email && !settings?.contact_phone && !settings?.contact_address && (
                <p className="text-white">Set contact details in Admin → Site Settings to show them here.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
