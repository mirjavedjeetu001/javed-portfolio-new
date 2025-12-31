import React, { useEffect, useMemo, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
import usePortfolio from "../hooks/usePortfolio";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { data } = usePortfolio();
  const settings = data?.siteSettings;
  const hasBlog = settings?.enable_blog || (data?.blogPosts?.length || 0) > 0;
  const resumeLink = data?.about?.resume || "";

  const navItems = useMemo(
    () => [
      { key: "home", label: "Home", to: "/", icon: <AiOutlineHome style={{ marginBottom: "2px" }} />, show: true },
      { key: "about", label: "About", to: "/about", icon: <AiOutlineUser style={{ marginBottom: "2px" }} />, show: Boolean(data?.about) },
      {
        key: "projects",
        label: "Projects",
        to: "/project",
        icon: <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} />,
        show: (data?.projects?.length || 0) > 0,
      },
      {
        key: "blog",
        label: "Blog",
        to: "/blog",
        icon: <ImBlog style={{ marginBottom: "2px" }} />,
        show: hasBlog,
      },
      {
        key: "resume",
        label: "Resume",
        to: "/resume",
        icon: <CgFileDocument style={{ marginBottom: "2px" }} />,
        show: Boolean(resumeLink),
      },
    ],
    [data, hasBlog, resumeLink]
  );

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {settings?.site_logo ? (
            <img src={settings.site_logo} className="img-fluid logo" alt={settings.site_name} />
          ) : (
            <span className="fw-bold text-white" style={{ fontSize: "1.1rem" }}>
              {settings?.site_name || "Portfolio"}
            </span>
          )}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <Nav.Item key={item.key}>
                  <Nav.Link as={Link} to={item.to} onClick={() => updateExpanded(false)}>
                    {item.icon} {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
