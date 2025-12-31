const express = require("express");
const fs = require("fs");
const path = require("path");
const authenticate = require("../middleware/auth");
const { createCrudRouter } = require("./crudFactory");

const router = express.Router();

// Public upload endpoint (no auth required for demo; protect with firewall/reverse proxy in production)
router.post("/upload/resume", async (req, res) => {
  try {
    const { file, filename } = req.body;
    if (!file) return res.status(400).json({ message: "file is required" });

    const match = file.match(/^data:(.*);base64,(.*)$/);
    if (!match || !match[2]) return res.status(400).json({ message: "Invalid file format" });

    const mime = match[1];
    if (mime !== "application/pdf") return res.status(400).json({ message: "Only PDF is allowed" });

    const buffer = Buffer.from(match[2], "base64");
    if (buffer.length > 12 * 1024 * 1024) return res.status(400).json({ message: "File too large (max 12MB)" });

    const uploadRoot = path.join(__dirname, "..", "..", "uploads", "resumes");
    fs.mkdirSync(uploadRoot, { recursive: true });
    const safeName = (filename || "resume.pdf").replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
    const outName = `${Date.now()}-${safeName}`;
    const outPath = path.join(uploadRoot, outName);
    fs.writeFileSync(outPath, buffer);

    return res.json({ url: `/uploads/resumes/${outName}` });
  } catch (err) {
    return res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

router.use(authenticate);

const resources = [
  {
    path: "site-settings",
    table: "site_settings",
    allowedFields: [
      "site_name",
      "site_title",
      "site_description",
      "site_keywords",
      "site_logo",
      "site_favicon",
      "contact_email",
      "contact_phone",
      "contact_address",
      "facebook_url",
      "twitter_url",
      "linkedin_url",
      "github_url",
      "instagram_url",
      "youtube_url",
      "hero_title",
      "hero_subtitle",
      "hero_description",
      "hero_background_image",
      "hero_cta_text",
      "hero_cta_link",
      "footer_text",
      "footer_description",
      "show_social_in_footer",
      "google_analytics_id",
      "google_site_verification",
      "facebook_pixel_id",
      "enable_blog",
      "enable_comments",
      "enable_newsletter",
      "enable_contact_form",
      "admin_brand",
      "admin_header",
      "admin_welcome",
      "maintenance_mode",
      "maintenance_message",
      "preloader_text",
      "theme_color",
      "secondary_color",
    ],
    orderBy: "id DESC",
  },
  {
    path: "about",
    table: "about",
    allowedFields: [
      "greeting",
      "name",
      "title",
      "titles_list",
      "bio",
      "profile_image",
      "resume",
      "email",
      "phone",
      "location",
      "intro_text",
      "hobbies",
      "quote",
      "quote_author",
      "github",
      "linkedin",
      "twitter",
    ],
    orderBy: "id DESC",
  },
  {
    path: "projects",
    table: "projects",
    allowedFields: [
      "title",
      "slug",
      "description",
      "detailed_description",
      "image",
      "demo_url",
      "github_url",
      "technologies",
      "featured",
      "order",
    ],
    orderBy: "`order`, created_at DESC",
  },
  {
    path: "skills",
    table: "skills",
    allowedFields: ["name", "level", "percentage", "icon", "order"],
    orderBy: "`order`, id ASC",
  },
  {
    path: "professional-skills",
    table: "professional_skills",
    allowedFields: ["name", "icon", "category", "order"],
    orderBy: "`order`, id ASC",
  },
  {
    path: "tools",
    table: "tools",
    allowedFields: ["name", "icon", "category", "order"],
    orderBy: "`order`, id ASC",
  },
  {
    path: "experience",
    table: "experience",
    allowedFields: [
      "company",
      "position",
      "description",
      "start_date",
      "end_date",
      "location",
      "company_url",
      "order",
    ],
    orderBy: "`order`, start_date DESC",
  },
  {
    path: "education",
    table: "education",
    allowedFields: [
      "institution",
      "degree",
      "field_of_study",
      "start_date",
      "end_date",
      "grade",
      "description",
      "order",
    ],
    orderBy: "`order`, start_date DESC",
  },
  {
    path: "certifications",
    table: "certifications",
    allowedFields: [
      "title",
      "issuer",
      "field_of_study",
      "start_date",
      "end_date",
      "description",
      "order",
      "credential_url",
      "image",
    ],
    orderBy: "`order`, start_date DESC",
  },
  {
    path: "blog-posts",
    table: "blog_posts",
    allowedFields: [
      "title",
      "slug",
      "excerpt",
      "content",
      "featured_image",
      "status",
      "featured",
      "views",
      "reading_time",
      "seo_title",
      "seo_description",
      "published_at",
      "categoryId",
    ],
    orderBy: "created_at DESC",
  },
  {
    path: "categories",
    table: "categories",
    allowedFields: ["name", "slug", "description"],
    orderBy: "created_at DESC",
  },
  {
    path: "tags",
    table: "tags",
    allowedFields: ["name", "slug"],
    orderBy: "id DESC",
  },
  {
    path: "testimonials",
    table: "testimonials",
    allowedFields: [
      "name",
      "position",
      "company",
      "image",
      "content",
      "rating",
      "featured",
    ],
    orderBy: "created_at DESC",
  },
  {
    path: "github-stats",
    table: "github_stats",
    allowedFields: [
      "github_username",
      "total_contributions",
      "days_coded",
      "contribution_data",
      "use_live_github",
      "last_updated",
    ],
    orderBy: "id DESC",
  },
  {
    path: "contact-messages",
    table: "contact_messages",
    allowedFields: ["status"],
    orderBy: "created_at DESC",
  },
  {
    path: "newsletter",
    table: "newsletter",
    allowedFields: ["email", "subscribed"],
    orderBy: "subscribed_at DESC",
  },
];

resources.forEach((resource) => {
  router.use(`/${resource.path}`, createCrudRouter(resource));
});

module.exports = router;

// Public upload endpoint moved to top of file before auth middleware
