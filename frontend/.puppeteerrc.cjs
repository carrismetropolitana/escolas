// Set .cache to root of container
// https://pptr.dev/

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: '/app/.cache/puppeteer',
};
