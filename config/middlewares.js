module.exports = ({ env }) => [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  {
    name: 'global::persistent-uploads',
    config: {},
  },
  'strapi::public',
  {
    name: 'global::site-media',
    config: {},
  },
];
