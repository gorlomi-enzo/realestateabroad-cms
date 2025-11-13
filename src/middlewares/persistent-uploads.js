const path = require('path');
const fs = require('fs');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only handle /uploads/* requests
    if (!ctx.url.startsWith('/uploads/')) {
      return await next();
    }

    // In production, serve from persistent disk
    if (process.env.NODE_ENV === 'production') {
      const filePath = path.join('/opt/render/project/data', ctx.url);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        ctx.type = path.extname(filePath);
        ctx.body = fs.createReadStream(filePath);
        return;
      }
    }

    // Fall back to default behavior (public/uploads in development)
    await next();
  };
};
