module.exports = {
  siteUrl: process.env.SITE_URL || 'https://asadali.xenvasol.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
