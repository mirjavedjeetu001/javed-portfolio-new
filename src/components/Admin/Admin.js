import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Spinner,
  Stack,
  Table,
} from "react-bootstrap";
import api, { loadSavedToken, setAuthToken } from "../../api/client";
import usePortfolio from "../../hooks/usePortfolio";

function Admin() {
  const { refresh } = usePortfolio();
  const [token, setToken] = useState(loadSavedToken());
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [siteSettings, setSiteSettings] = useState(null);
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [proSkills, setProSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const isAuthed = useMemo(() => Boolean(token), [token]);

  useEffect(() => {
    if (!token) return;
    loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function showBanner(variant, message) {
    setBanner({ variant, message });
    setTimeout(() => setBanner(null), 3500);
  }

  async function loadAdminData() {
    try {
      setLoading(true);
      const [
        settingsRes,
        aboutRes,
        projectsRes,
        expRes,
        eduRes,
        certRes,
        skillsRes,
        proRes,
        toolsRes,
        inboxRes,
        blogRes,
        catRes,
        tagRes,
        testiRes,
      ] = await Promise.all([
        api.get("/admin/site-settings"),
        api.get("/admin/about"),
        api.get("/admin/projects"),
        api.get("/admin/experience"),
        api.get("/admin/education"),
        api.get("/admin/certifications"),
        api.get("/admin/skills"),
        api.get("/admin/professional-skills"),
        api.get("/admin/tools"),
        api.get("/admin/contact-messages"),
        api.get("/admin/blog-posts"),
        api.get("/admin/categories"),
        api.get("/admin/tags"),
        api.get("/admin/testimonials"),
      ]);

      setSiteSettings(settingsRes.data[0] || null);
      setAbout(aboutRes.data[0] || null);
      setProjects(projectsRes.data);
      setExperience(expRes.data);
      setEducation(eduRes.data);
      setCertifications(certRes.data);
      setSkills(skillsRes.data);
      setProSkills(proRes.data);
      setTools(toolsRes.data);
      setContactMessages(inboxRes.data);
      setBlogPosts(blogRes.data);
      setCategories(catRes.data);
      setTags(tagRes.data);
      setTestimonials(testiRes.data);
    } catch (err) {
      showBanner("danger", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", loginForm);
      setAuthToken(data.token);
      setToken(data.token);
      showBanner("success", "Logged in. Loading data...");
    } catch (err) {
      showBanner("danger", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuthToken(null);
    setToken(null);
    setSiteSettings(null);
    setAbout(null);
    setProjects([]);
    setExperience([]);
    setEducation([]);
    setCertifications([]);
    setSkills([]);
    setProSkills([]);
    setTools([]);
    setContactMessages([]);
    setBlogPosts([]);
    setCategories([]);
    setTags([]);
    setTestimonials([]);
  }

  async function saveSingle(resource, payload, setter) {
    try {
      setLoading(true);
      const path = payload.id ? `/admin/${resource}/${payload.id}` : `/admin/${resource}`;
      const method = payload.id ? "put" : "post";
      const { data } = await api[method](path, payload);
      setter(data);
      showBanner("success", "Saved");
      refresh();
    } catch (err) {
      showBanner("danger", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveListItem(resource, item, setList) {
    try {
      setLoading(true);
      const path = item.id ? `/admin/${resource}/${item.id}` : `/admin/${resource}`;
      const method = item.id ? "put" : "post";
      const { data } = await api[method](path, item);
      setList((prev) => {
        if (item.id) return prev.map((p) => (p.id === item.id ? data : p));
        return prev.map((p) => (p.__tmp === item.__tmp ? data : p));
      });
      showBanner("success", "Saved");
      refresh();
    } catch (err) {
      showBanner("danger", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteListItem(resource, id, setList) {
    if (!id) {
      setList((prev) => prev.filter((p) => p.id));
      return;
    }
    try {
      setLoading(true);
      await api.delete(`/admin/${resource}/${id}`);
      setList((prev) => prev.filter((p) => p.id !== id));
      showBanner("success", "Deleted");
      refresh();
    } catch (err) {
      showBanner("danger", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  function addBlank(setter, template) {
    setter((prev) => [...prev, { __tmp: Date.now(), ...template }]);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadResume(file) {
    if (!file) return;
    try {
      setLoading(true);
      const encoded = await fileToBase64(file);
      const { data } = await api.post("/admin/upload/resume", { file: encoded, filename: file.name });
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
      const apiOrigin = apiBase.replace(/\/?api\/?$/, "");
      const fileUrl = data.url?.startsWith("http") ? data.url : `${apiOrigin}${data.url}`;
      setAbout((prev) => ({ ...(prev || {}), resume: fileUrl }));
      showBanner("success", "Resume uploaded. Click Save about to publish.");
    } catch (err) {
      showBanner("danger", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  const overviewCards = [
    { label: "Projects", value: projects.length },
    { label: "Experience", value: experience.length },
    { label: "Education", value: education.length },
    { label: "Certifications", value: certifications.length },
    { label: "Skills", value: skills.length + proSkills.length + tools.length },
    { label: "Blog posts", value: blogPosts.length },
    { label: "Testimonials", value: testimonials.length },
    { label: "Inbox", value: contactMessages.length },
  ];

  if (!isAuthed) {
    return (
      <Container style={{ minHeight: "80vh", paddingTop: 60 }}>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Admin Login</Card.Title>
                {banner && (
                  <Alert variant={banner.variant} className="mt-2">
                    {banner.message}
                  </Alert>
                )}
                <Form onSubmit={handleLogin} className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@example.com"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </Form.Group>
                  <Button type="submit" disabled={loading} className="w-100">
                    {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-title">CMS</div>
          <div className="admin-brand-sub">Control Center</div>
        </div>
        <Nav variant="pills" activeKey={activeTab} className="flex-column">
          {[
            { id: "overview", label: "Overview" },
            { id: "site", label: "Site" },
            { id: "about", label: "About/Hero" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "education", label: "Education" },
            { id: "certifications", label: "Certifications" },
            { id: "skills", label: "Skills" },
            { id: "blog", label: "Blog" },
            { id: "categories", label: "Categories/Tags" },
            { id: "testimonials", label: "Testimonials" },
            { id: "inbox", label: "Inbox" },
          ].map((tab) => (
            <Nav.Item key={tab.id} className="mb-1">
              <Nav.Link eventKey={tab.id} onClick={() => setActiveTab(tab.id)} className="admin-nav-link">
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="mt-auto pt-3">
          <Button variant="outline-light" size="sm" className="w-100 mb-2" onClick={refresh}>
            Refresh public data
          </Button>
          <Button variant="light" size="sm" className="w-100" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div>
            <div className="text-muted" style={{ fontSize: 12 }}>Portfolio</div>
            <h3 className="mb-0">Admin Console</h3>
          </div>
          {loading && (
            <div className="text-muted">
              <Spinner animation="border" size="sm" className="me-2" /> Working...
            </div>
          )}
        </div>

        <Container fluid className="admin-content">
          {banner && (
            <Alert variant={banner.variant} className="mb-3">
              {banner.message}
            </Alert>
          )}

          {activeTab === "overview" && (
            <Row className="gy-3">
              {overviewCards.map((card) => (
                <Col key={card.label} md={3} sm={6}>
                  <Card className="shadow-sm admin-card">
                    <Card.Body>
                      <div className="text-muted" style={{ fontSize: 12 }}>{card.label}</div>
                      <div style={{ fontSize: 28, fontWeight: 700 }}>{card.value}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {activeTab === "site" && (
        <Row className="gy-4">
          <Col md={6}>
            <Card className="shadow-sm admin-card">
              <Card.Body>
                <Card.Title>Brand & Theme</Card.Title>
                {siteSettings ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Site name</Form.Label>
                      <Form.Control
                        value={siteSettings.site_name || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, site_name: e.target.value }))}
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Logo URL</Form.Label>
                        <Form.Control
                          value={siteSettings.site_logo || ""}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, site_logo: e.target.value }))}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Favicon URL</Form.Label>
                        <Form.Control
                          value={siteSettings.site_favicon || ""}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, site_favicon: e.target.value }))}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Primary color</Form.Label>
                        <Form.Control
                          type="color"
                          value={siteSettings.theme_color || "#ff6b35"}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, theme_color: e.target.value }))}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Secondary color</Form.Label>
                        <Form.Control
                          type="color"
                          value={siteSettings.secondary_color || "#f7931e"}
                          onChange={(e) => setSiteSettings((prev) => ({ ...prev, secondary_color: e.target.value }))}
                        />
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Preloader text</Form.Label>
                      <Form.Control
                        value={siteSettings.preloader_text || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, preloader_text: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Footer text</Form.Label>
                      <Form.Control
                        value={siteSettings.footer_text || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, footer_text: e.target.value }))}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={() => saveSingle("site-settings", siteSettings, setSiteSettings)} disabled={loading}>
                      Save site
                    </Button>
                  </Form>
                ) : (
                  <p className="text-muted">Loading settings...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm admin-card">
              <Card.Body>
                <Card.Title>Hero & Contact</Card.Title>
                {siteSettings ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Hero title</Form.Label>
                      <Form.Control
                        value={siteSettings.hero_title || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, hero_title: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Hero subtitle</Form.Label>
                      <Form.Control
                        value={siteSettings.hero_subtitle || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, hero_subtitle: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Hero description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={siteSettings.hero_description || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, hero_description: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Hero background image URL</Form.Label>
                      <Form.Control
                        value={siteSettings.hero_background_image || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, hero_background_image: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact email</Form.Label>
                      <Form.Control
                        value={siteSettings.contact_email || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, contact_email: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact phone</Form.Label>
                      <Form.Control
                        value={siteSettings.contact_phone || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, contact_phone: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact address</Form.Label>
                      <Form.Control
                        value={siteSettings.contact_address || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, contact_address: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Social links</Form.Label>
                      <Form.Control
                        className="mb-2"
                        placeholder="GitHub"
                        value={siteSettings.github_url || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, github_url: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="LinkedIn"
                        value={siteSettings.linkedin_url || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="Twitter"
                        value={siteSettings.twitter_url || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, twitter_url: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="Instagram"
                        value={siteSettings.instagram_url || ""}
                        onChange={(e) => setSiteSettings((prev) => ({ ...prev, instagram_url: e.target.value }))}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={() => saveSingle("site-settings", siteSettings, setSiteSettings)} disabled={loading}>
                      Save hero/contact
                    </Button>
                  </Form>
                ) : (
                  <p className="text-muted">Loading...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {activeTab === "about" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Card.Title>About & CV</Card.Title>
            {about ? (
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Greeting</Form.Label>
                      <Form.Control
                        value={about.greeting || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, greeting: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        value={about.name || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        value={about.title || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Titles list (comma separated)</Form.Label>
                      <Form.Control
                        value={about.titles_list || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, titles_list: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={about.bio || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, bio: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Intro text</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={about.intro_text || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, intro_text: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Hobbies (comma separated)</Form.Label>
                      <Form.Control
                        value={about.hobbies || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, hobbies: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Quote</Form.Label>
                      <Form.Control
                        value={about.quote || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, quote: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Quote author</Form.Label>
                      <Form.Control
                        value={about.quote_author || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, quote_author: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Profile image URL</Form.Label>
                      <Form.Control
                        value={about.profile_image || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, profile_image: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Resume link</Form.Label>
                      <Form.Control
                        value={about.resume || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, resume: e.target.value }))}
                      />
                      <Form.Text className="text-muted">Paste a direct PDF link or upload below.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Upload resume (PDF)</Form.Label>
                      <Form.Control
                        type="file"
                        accept="application/pdf"
                        disabled={loading}
                        onChange={(e) => uploadResume(e.target.files?.[0])}
                      />
                      <Form.Text className="text-muted">Uploads store the PDF on this server and set the link automatically.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact</Form.Label>
                      <Form.Control
                        className="mb-2"
                        placeholder="Email"
                        value={about.email || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, email: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="Phone"
                        value={about.phone || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="Location"
                        value={about.location || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Social links</Form.Label>
                      <Form.Control
                        className="mb-2"
                        placeholder="GitHub"
                        value={about.github || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, github: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="LinkedIn"
                        value={about.linkedin || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, linkedin: e.target.value }))}
                      />
                      <Form.Control
                        className="mb-2"
                        placeholder="Twitter"
                        value={about.twitter || ""}
                        onChange={(e) => setAbout((prev) => ({ ...prev, twitter: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" onClick={() => saveSingle("about", about, setAbout)} disabled={loading}>
                  Save about
                </Button>
              </Form>
            ) : (
              <p className="text-muted">Loading about...</p>
            )}
          </Card.Body>
        </Card>
      )}

      {activeTab === "projects" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <div>
                <Card.Title className="mb-0">Projects</Card.Title>
                <div className="text-muted" style={{ fontSize: 12 }}>Order controls homepage ordering</div>
              </div>
              <Button variant="outline-primary" size="sm" className="ms-auto" onClick={() => addBlank(setProjects, {
                title: "",
                slug: "",
                description: "",
                detailed_description: "",
                image: "",
                demo_url: "",
                github_url: "",
                technologies: "",
                featured: 0,
                order: projects.length + 1,
              })}>
                Add project
              </Button>
            </Stack>
            <Row className="gy-3">
              {projects.map((project) => (
                <Col md={6} key={project.id || project.__tmp}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            value={project.title || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, title: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Slug</Form.Label>
                          <Form.Control
                            value={project.slug || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, slug: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Image URL</Form.Label>
                          <Form.Control
                            value={project.image || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, image: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Demo link</Form.Label>
                          <Form.Control
                            value={project.demo_url || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, demo_url: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>GitHub link</Form.Label>
                          <Form.Control
                            value={project.github_url || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, github_url: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Technologies (comma separated)</Form.Label>
                          <Form.Control
                            value={project.technologies || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, technologies: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Order</Form.Label>
                          <Form.Control
                            type="number"
                            value={project.order || 0}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, order: Number(e.target.value) } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Check
                            type="switch"
                            id={`featured-${project.id || project.__tmp}`}
                            label="Featured"
                            checked={Boolean(project.featured)}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, featured: e.target.checked ? 1 : 0 } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Short description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={project.description || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, description: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Detailed description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={project.detailed_description || ""}
                            onChange={(e) =>
                              setProjects((prev) => prev.map((p) => (p.id === project.id || p.__tmp === project.__tmp ? { ...p, detailed_description: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button variant="primary" size="sm" onClick={() => saveListItem("projects", project, setProjects)} disabled={loading}>
                            Save
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => deleteListItem("projects", project.id, setProjects)} disabled={loading}>
                            Delete
                          </Button>
                        </Stack>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {activeTab === "experience" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <Card.Title className="mb-0">Experience</Card.Title>
              <Button variant="outline-primary" size="sm" className="ms-auto" onClick={() => addBlank(setExperience, {
                company: "",
                position: "",
                description: "",
                start_date: "",
                end_date: "",
                location: "",
                company_url: "",
                order: experience.length + 1,
              })}>
                Add experience
              </Button>
            </Stack>
            <Row className="gy-3">
              {experience.map((item) => (
                <Col md={6} key={item.id || item.__tmp}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Company</Form.Label>
                          <Form.Control
                            value={item.company || ""}
                            onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, company: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Position</Form.Label>
                          <Form.Control
                            value={item.position || ""}
                            onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, position: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, description: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Row className="mb-2">
                          <Col>
                            <Form.Label>Start date</Form.Label>
                            <Form.Control
                              type="date"
                              value={item.start_date || ""}
                              onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, start_date: e.target.value } : p)))}
                            />
                          </Col>
                          <Col>
                            <Form.Label>End date</Form.Label>
                            <Form.Control
                              type="date"
                              value={item.end_date || ""}
                              onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, end_date: e.target.value } : p)))}
                            />
                          </Col>
                        </Row>
                        <Form.Group className="mb-2">
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            value={item.location || ""}
                            onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, location: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Company URL</Form.Label>
                          <Form.Control
                            value={item.company_url || ""}
                            onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, company_url: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Order</Form.Label>
                          <Form.Control
                            type="number"
                            value={item.order || 0}
                            onChange={(e) => setExperience((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, order: Number(e.target.value) } : p)))}
                          />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button variant="primary" size="sm" onClick={() => saveListItem("experience", item, setExperience)} disabled={loading}>
                            Save
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => deleteListItem("experience", item.id, setExperience)} disabled={loading}>
                            Delete
                          </Button>
                        </Stack>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {activeTab === "education" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <Card.Title className="mb-0">Education</Card.Title>
              <Button variant="outline-primary" size="sm" className="ms-auto" onClick={() => addBlank(setEducation, {
                institution: "",
                degree: "",
                field_of_study: "",
                start_date: "",
                end_date: "",
                grade: "",
                description: "",
                order: education.length + 1,
              })}>
                Add education
              </Button>
            </Stack>
            <Row className="gy-3">
              {education.map((item) => (
                <Col md={6} key={item.id || item.__tmp}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Institution</Form.Label>
                          <Form.Control
                            value={item.institution || ""}
                            onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, institution: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Degree</Form.Label>
                          <Form.Control
                            value={item.degree || ""}
                            onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, degree: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Field</Form.Label>
                          <Form.Control
                            value={item.field_of_study || ""}
                            onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, field_of_study: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Row className="mb-2">
                          <Col>
                            <Form.Label>Start date</Form.Label>
                            <Form.Control
                              type="date"
                              value={item.start_date || ""}
                              onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, start_date: e.target.value } : p)))}
                            />
                          </Col>
                          <Col>
                            <Form.Label>End date</Form.Label>
                            <Form.Control
                              type="date"
                              value={item.end_date || ""}
                              onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, end_date: e.target.value } : p)))}
                            />
                          </Col>
                        </Row>
                        <Form.Group className="mb-2">
                          <Form.Label>Grade</Form.Label>
                          <Form.Control
                            value={item.grade || ""}
                            onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, grade: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, description: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Order</Form.Label>
                          <Form.Control
                            type="number"
                            value={item.order || 0}
                            onChange={(e) => setEducation((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, order: Number(e.target.value) } : p)))}
                          />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button variant="primary" size="sm" onClick={() => saveListItem("education", item, setEducation)} disabled={loading}>
                            Save
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => deleteListItem("education", item.id, setEducation)} disabled={loading}>
                            Delete
                          </Button>
                        </Stack>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {activeTab === "certifications" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <Card.Title className="mb-0">Certifications</Card.Title>
              <Button
                variant="outline-primary"
                size="sm"
                className="ms-auto"
                onClick={() =>
                  addBlank(setCertifications, {
                    title: "",
                    issuer: "",
                    field_of_study: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                    credential_url: "",
                    order: certifications.length + 1,
                  })
                }
              >
                Add certification
              </Button>
            </Stack>
            <Row className="gy-3">
              {certifications.map((item) => (
                <Col md={6} key={item.id || item.__tmp}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            value={item.title || ""}
                            onChange={(e) =>
                              setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, title: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Issuer</Form.Label>
                          <Form.Control
                            value={item.issuer || ""}
                            onChange={(e) =>
                              setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, issuer: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Category / Field</Form.Label>
                          <Form.Control
                            value={item.field_of_study || ""}
                            onChange={(e) =>
                              setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, field_of_study: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Row className="mb-2">
                          <Col>
                            <Form.Label>Start date</Form.Label>
                            <Form.Control
                              type="date"
                              value={item.start_date || ""}
                              onChange={(e) =>
                                setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, start_date: e.target.value } : p)))
                              }
                            />
                          </Col>
                          <Col>
                            <Form.Label>End date</Form.Label>
                            <Form.Control
                              type="date"
                              value={item.end_date || ""}
                              onChange={(e) =>
                                setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, end_date: e.target.value } : p)))
                              }
                            />
                          </Col>
                        </Row>
                        <Form.Group className="mb-2">
                          <Form.Label>Credential URL</Form.Label>
                          <Form.Control
                            value={item.credential_url || ""}
                            onChange={(e) =>
                              setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, credential_url: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Order</Form.Label>
                          <Form.Control
                            type="number"
                            value={item.order || 0}
                            onChange={(e) =>
                              setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, order: Number(e.target.value) } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) =>
                              setCertifications((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, description: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => saveListItem("certifications", item, setCertifications)}
                            disabled={loading}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteListItem("certifications", item.id, setCertifications)}
                            disabled={loading}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {activeTab === "skills" && (
        <Row className="gy-3">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Stack direction="horizontal" className="mb-2">
                  <Card.Title className="mb-0">Skills</Card.Title>
                  <Button size="sm" variant="outline-primary" className="ms-auto" onClick={() => addBlank(setSkills, {
                    name: "",
                    level: "intermediate",
                    percentage: 50,
                    icon: "",
                    order: skills.length + 1,
                  })}>
                    Add
                  </Button>
                </Stack>
                <Table hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Level</th>
                      <th>%</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((s) => (
                      <tr key={s.id || s.__tmp}>
                        <td>
                          <Form.Control
                            value={s.name || ""}
                            onChange={(e) => setSkills((prev) => prev.map((p) => (p.id === s.id || p.__tmp === s.__tmp ? { ...p, name: e.target.value } : p)))}
                          />
                        </td>
                        <td>
                          <Form.Select
                            value={s.level || "intermediate"}
                            onChange={(e) => setSkills((prev) => prev.map((p) => (p.id === s.id || p.__tmp === s.__tmp ? { ...p, level: e.target.value } : p)))}
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </Form.Select>
                        </td>
                        <td style={{ width: 90 }}>
                          <Form.Control
                            type="number"
                            value={s.percentage || 0}
                            onChange={(e) => setSkills((prev) => prev.map((p) => (p.id === s.id || p.__tmp === s.__tmp ? { ...p, percentage: Number(e.target.value) } : p)))}
                          />
                        </td>
                        <td className="text-end">
                          <Button size="sm" variant="link" onClick={() => saveListItem("skills", s, setSkills)} disabled={loading}>
                            Save
                          </Button>
                          <Button size="sm" variant="link" onClick={() => deleteListItem("skills", s.id, setSkills)} disabled={loading}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Stack direction="horizontal" className="mb-2">
                  <Card.Title className="mb-0">Professional Skills</Card.Title>
                  <Button size="sm" variant="outline-primary" className="ms-auto" onClick={() => addBlank(setProSkills, {
                    name: "",
                    icon: "",
                    category: "other",
                    order: proSkills.length + 1,
                  })}>
                    Add
                  </Button>
                </Stack>
                <Table hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {proSkills.map((s) => (
                      <tr key={s.id || s.__tmp}>
                        <td>
                          <Form.Control
                            value={s.name || ""}
                            onChange={(e) => setProSkills((prev) => prev.map((p) => (p.id === s.id || p.__tmp === s.__tmp ? { ...p, name: e.target.value } : p)))}
                          />
                          <Form.Control
                            className="mt-1"
                            placeholder="Icon URL"
                            value={s.icon || ""}
                            onChange={(e) => setProSkills((prev) => prev.map((p) => (p.id === s.id || p.__tmp === s.__tmp ? { ...p, icon: e.target.value } : p)))}
                          />
                        </td>
                        <td>
                          <Form.Select
                            value={s.category || "other"}
                            onChange={(e) => setProSkills((prev) => prev.map((p) => (p.id === s.id || p.__tmp === s.__tmp ? { ...p, category: e.target.value } : p)))}
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="language">Language</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </td>
                        <td className="text-end">
                          <Button size="sm" variant="link" onClick={() => saveListItem("professional-skills", s, setProSkills)} disabled={loading}>
                            Save
                          </Button>
                          <Button size="sm" variant="link" onClick={() => deleteListItem("professional-skills", s.id, setProSkills)} disabled={loading}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Stack direction="horizontal" className="mb-2">
                  <Card.Title className="mb-0">Tools</Card.Title>
                  <Button size="sm" variant="outline-primary" className="ms-auto" onClick={() => addBlank(setTools, {
                    name: "",
                    icon: "",
                    category: "other",
                    order: tools.length + 1,
                  })}>
                    Add
                  </Button>
                </Stack>
                <Table hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((t) => (
                      <tr key={t.id || t.__tmp}>
                        <td>
                          <Form.Control
                            value={t.name || ""}
                            onChange={(e) => setTools((prev) => prev.map((p) => (p.id === t.id || p.__tmp === t.__tmp ? { ...p, name: e.target.value } : p)))}
                          />
                          <Form.Control
                            className="mt-1"
                            placeholder="Icon URL"
                            value={t.icon || ""}
                            onChange={(e) => setTools((prev) => prev.map((p) => (p.id === t.id || p.__tmp === t.__tmp ? { ...p, icon: e.target.value } : p)))}
                          />
                        </td>
                        <td>
                          <Form.Select
                            value={t.category || "other"}
                            onChange={(e) => setTools((prev) => prev.map((p) => (p.id === t.id || p.__tmp === t.__tmp ? { ...p, category: e.target.value } : p)))}
                          >
                            <option value="cloud">Cloud</option>
                            <option value="editor">Editor</option>
                            <option value="os">OS</option>
                            <option value="testing">Testing</option>
                            <option value="collaboration">Collaboration</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </td>
                        <td className="text-end">
                          <Button size="sm" variant="link" onClick={() => saveListItem("tools", t, setTools)} disabled={loading}>
                            Save
                          </Button>
                          <Button size="sm" variant="link" onClick={() => deleteListItem("tools", t.id, setTools)} disabled={loading}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {activeTab === "blog" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <div>
                <Card.Title className="mb-0">Blog posts</Card.Title>
                <div className="text-muted" style={{ fontSize: 12 }}>Publish articles and feature them on home</div>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                className="ms-auto"
                onClick={() =>
                  addBlank(setBlogPosts, {
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    featured_image: "",
                    status: "draft",
                    featured: 0,
                    reading_time: 5,
                    categoryId: categories[0]?.id || null,
                  })
                }
              >
                Add post
              </Button>
            </Stack>
            <Row className="gy-3">
              {blogPosts.map((post) => (
                <Col md={6} key={post.id || post.__tmp}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            value={post.title || ""}
                            onChange={(e) =>
                              setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, title: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Slug</Form.Label>
                          <Form.Control
                            value={post.slug || ""}
                            onChange={(e) =>
                              setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, slug: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Excerpt</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={post.excerpt || ""}
                            onChange={(e) =>
                              setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, excerpt: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Content</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={post.content || ""}
                            onChange={(e) =>
                              setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, content: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Featured image URL</Form.Label>
                          <Form.Control
                            value={post.featured_image || ""}
                            onChange={(e) =>
                              setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, featured_image: e.target.value } : p)))
                            }
                          />
                        </Form.Group>
                        <Row className="mb-2">
                          <Col>
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              value={post.status || "draft"}
                              onChange={(e) =>
                                setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, status: e.target.value } : p)))
                              }
                            >
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                            </Form.Select>
                          </Col>
                          <Col>
                            <Form.Label>Reading time (min)</Form.Label>
                            <Form.Control
                              type="number"
                              value={post.reading_time || 0}
                              onChange={(e) =>
                                setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, reading_time: Number(e.target.value) } : p)))
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                              value={post.categoryId || ""}
                              onChange={(e) =>
                                setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, categoryId: e.target.value } : p)))
                              }
                            >
                              <option value="">Select category</option>
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col>
                            <Form.Label>Published at</Form.Label>
                            <Form.Control
                              type="date"
                              value={post.published_at ? post.published_at.split("T")[0] : ""}
                              onChange={(e) =>
                                setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, published_at: e.target.value } : p)))
                              }
                            />
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id={`blog-featured-${post.id || post.__tmp}`}
                            label="Featured"
                            checked={Boolean(post.featured)}
                            onChange={(e) =>
                              setBlogPosts((prev) => prev.map((p) => (p.id === post.id || p.__tmp === post.__tmp ? { ...p, featured: e.target.checked ? 1 : 0 } : p)))
                            }
                          />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button variant="primary" size="sm" onClick={() => saveListItem("blog-posts", post, setBlogPosts)} disabled={loading}>
                            Save
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => deleteListItem("blog-posts", post.id, setBlogPosts)} disabled={loading}>
                            Delete
                          </Button>
                        </Stack>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {activeTab === "categories" && (
        <Row className="gy-3">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Stack direction="horizontal" className="mb-2">
                  <Card.Title className="mb-0">Categories</Card.Title>
                  <Button size="sm" variant="outline-primary" className="ms-auto" onClick={() => addBlank(setCategories, { name: "", slug: "", description: "" })}>
                    Add
                  </Button>
                </Stack>
                <Table hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id || cat.__tmp}>
                        <td>
                          <Form.Control
                            value={cat.name || ""}
                            onChange={(e) => setCategories((prev) => prev.map((p) => (p.id === cat.id || p.__tmp === cat.__tmp ? { ...p, name: e.target.value } : p)))}
                          />
                        </td>
                        <td>
                          <Form.Control
                            value={cat.slug || ""}
                            onChange={(e) => setCategories((prev) => prev.map((p) => (p.id === cat.id || p.__tmp === cat.__tmp ? { ...p, slug: e.target.value } : p)))}
                          />
                        </td>
                        <td className="text-end">
                          <Button size="sm" variant="link" onClick={() => saveListItem("categories", cat, setCategories)} disabled={loading}>
                            Save
                          </Button>
                          <Button size="sm" variant="link" onClick={() => deleteListItem("categories", cat.id, setCategories)} disabled={loading}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Stack direction="horizontal" className="mb-2">
                  <Card.Title className="mb-0">Tags</Card.Title>
                  <Button size="sm" variant="outline-primary" className="ms-auto" onClick={() => addBlank(setTags, { name: "", slug: "" })}>
                    Add
                  </Button>
                </Stack>
                <Table hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags.map((tag) => (
                      <tr key={tag.id || tag.__tmp}>
                        <td>
                          <Form.Control
                            value={tag.name || ""}
                            onChange={(e) => setTags((prev) => prev.map((p) => (p.id === tag.id || p.__tmp === tag.__tmp ? { ...p, name: e.target.value } : p)))}
                          />
                        </td>
                        <td>
                          <Form.Control
                            value={tag.slug || ""}
                            onChange={(e) => setTags((prev) => prev.map((p) => (p.id === tag.id || p.__tmp === tag.__tmp ? { ...p, slug: e.target.value } : p)))}
                          />
                        </td>
                        <td className="text-end">
                          <Button size="sm" variant="link" onClick={() => saveListItem("tags", tag, setTags)} disabled={loading}>
                            Save
                          </Button>
                          <Button size="sm" variant="link" onClick={() => deleteListItem("tags", tag.id, setTags)} disabled={loading}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {activeTab === "testimonials" && (
        <Card className="shadow-sm admin-card">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <Card.Title className="mb-0">Testimonials</Card.Title>
              <Button variant="outline-primary" size="sm" className="ms-auto" onClick={() => addBlank(setTestimonials, {
                name: "",
                position: "",
                company: "",
                image: "",
                content: "",
                rating: 5,
                featured: 0,
              })}>
                Add testimonial
              </Button>
            </Stack>
            <Row className="gy-3">
              {testimonials.map((item) => (
                <Col md={6} key={item.id || item.__tmp}>
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            value={item.name || ""}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, name: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Position</Form.Label>
                          <Form.Control
                            value={item.position || ""}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, position: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Company</Form.Label>
                          <Form.Control
                            value={item.company || ""}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, company: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Image URL</Form.Label>
                          <Form.Control
                            value={item.image || ""}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, image: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            type="number"
                            min={1}
                            max={5}
                            value={item.rating || 0}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, rating: Number(e.target.value) } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Quote</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={item.content || ""}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, content: e.target.value } : p)))}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            label="Featured"
                            checked={Boolean(item.featured)}
                            onChange={(e) => setTestimonials((prev) => prev.map((p) => (p.id === item.id || p.__tmp === item.__tmp ? { ...p, featured: e.target.checked ? 1 : 0 } : p)))}
                          />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                          <Button variant="primary" size="sm" onClick={() => saveListItem("testimonials", item, setTestimonials)} disabled={loading}>
                            Save
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => deleteListItem("testimonials", item.id, setTestimonials)} disabled={loading}>
                            Delete
                          </Button>
                        </Stack>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      {activeTab === "inbox" && (
        <Card className="shadow-sm">
          <Card.Body>
            <Stack direction="horizontal" className="mb-3">
              <Card.Title className="mb-0">Contact Inbox</Card.Title>
              <Badge bg="secondary" className="ms-auto">{contactMessages.length} messages</Badge>
            </Stack>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.subject}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={msg.status || "new"}
                        onChange={(e) => {
                          const next = { ...msg, status: e.target.value };
                          saveListItem("contact-messages", next, setContactMessages);
                        }}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="closed">Closed</option>
                      </Form.Select>
                    </td>
                    <td>{new Date(msg.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
        </Container>
      </div>
    </div>
  );
}

export default Admin;
