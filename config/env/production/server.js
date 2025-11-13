const path = require('path');

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Configure upload directory for persistent disk
  dirs: {
    public: env('NODE_ENV') === 'production'
      ? '/opt/render/project/data'
      : path.join(__dirname, '../../../public')
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
