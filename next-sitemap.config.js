/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://reworkedge.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/admin/*"],
};
