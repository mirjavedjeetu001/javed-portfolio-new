import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import usePortfolio from "../../hooks/usePortfolio";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const { data } = usePortfolio();
  const about = data?.about;
  const [width, setWidth] = useState(1200);
  const [pages, setPages] = useState(null);

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const apiOrigin = apiBase.replace(/\/?api\/?$/, "");

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const resumeUrl = useMemo(() => {
    if (!about?.resume) return "";
    if (about.resume.startsWith("/uploads")) return `${apiOrigin}${about.resume}`;
    return about.resume;
  }, [about, apiOrigin]);

  function getDrivePreview(url) {
    const match = url.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)\//i);
    if (match && match[1]) return `https://drive.google.com/file/d/${match[1]}/preview`;
    return null;
  }

  const isPdf = resumeUrl ? resumeUrl.toLowerCase().endsWith(".pdf") : false;
  const drivePreview = resumeUrl ? getDrivePreview(resumeUrl) : null;
  const isServerPdf = resumeUrl ? resumeUrl.includes("/uploads/") : false;
  const previewUrl = isPdf ? resumeUrl : drivePreview || "";

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <h2 className="resume-title">Resume</h2>
            <p className="resume-sub">View or download the latest copy.</p>
            <Stack direction="horizontal" className="justify-content-center gap-2 resume-actions">
              {resumeUrl ? (
                <Button variant="primary" href={resumeUrl} target="_blank" rel="noreferrer" aria-label="Download resume">
                  <AiOutlineDownload />
                  &nbsp;Download CV
                </Button>
              ) : (
                <span className="text-white">Add your resume link in Admin → About.</span>
              )}
            </Stack>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col xl={8} lg={9} md={10} sm={12}>
            <div className="resume-preview">
              {!resumeUrl ? (
                <div className="text-center py-4 text-white">Add a direct PDF or Google Drive link in Admin → About to enable the preview.</div>
              ) : drivePreview ? (
                <iframe
                  title="Resume preview"
                  src={drivePreview}
                  style={{ width: "100%", minHeight: width > 786 ? "900px" : "600px", border: "none", borderRadius: "8px" }}
                  allow="autoplay"
                />
              ) : isPdf ? (
                isServerPdf ? (
                  <iframe
                    title="Resume preview"
                    src={resumeUrl}
                    style={{ width: "100%", minHeight: width > 786 ? "900px" : "600px", border: "none", borderRadius: "8px" }}
                    type="application/pdf"
                  />
                ) : (
                  <Document
                    file={previewUrl}
                    className="d-flex justify-content-center"
                    onLoadSuccess={({ numPages }) => setPages(numPages)}
                    options={{ cMapUrl: "cmaps/", cMapPacked: true, standardFontDataUrl: "standard_fonts/" }}
                    loading={<div className="text-center text-white py-4">Loading preview...</div>}
                    error={
                      <div className="text-center py-4">
                        <div className="text-white mb-3">Unable to load preview.</div>
                        {resumeUrl && (
                          <Button variant="primary" href={resumeUrl} target="_blank" rel="noreferrer">
                            <AiOutlineDownload />
                            &nbsp;Download CV
                          </Button>
                        )}
                      </div>
                    }
                  >
                    <Page pageNumber={1} scale={width > 1200 ? 1.5 : width > 786 ? 1.25 : 0.8} renderAnnotationLayer={false} renderTextLayer={false} />
                  </Document>
                )
              ) : (
                <div className="text-center py-4">
                  <div className="text-white mb-3">Preview not available for this file type.</div>
                  {resumeUrl && (
                    <Button variant="primary" href={resumeUrl} target="_blank" rel="noreferrer">
                      <AiOutlineDownload />
                      &nbsp;Download CV
                    </Button>
                  )}
                </div>
              )}
              {!isPdf && resumeUrl && !drivePreview && (
                <div className="text-white small text-center mt-3">
                  Provide a direct PDF link or Google Drive file link in Admin → About for an embedded preview.
                </div>
              )}
              {pages && pages > 1 && isPdf && !isServerPdf && (
                <div className="text-white small text-center mt-2">Showing page 1 of {pages}</div>
              )}
            </div>
          </Col>
        </Row>

        {resumeUrl ? (
          <Row className="justify-content-center mt-3">
            <Stack direction="horizontal" className="justify-content-center gap-2">
              <Button variant="primary" href={resumeUrl} target="_blank" rel="noreferrer" aria-label="Download resume">
                <AiOutlineDownload />
                &nbsp;Download CV
              </Button>
            </Stack>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default ResumeNew;
