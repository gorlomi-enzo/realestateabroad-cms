'use strict';

/**
 * news-article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::news-article.news-article', ({ strapi }) => ({
  // Custom find method with featuredImage population
  async find(ctx) {
    // Populate featuredImage by default
    ctx.query.populate = {
      ...ctx.query.populate,
      featuredImage: true
    };

    // Call the default find method
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Custom findOne method with featuredImage population
  async findOne(ctx) {
    // Populate featuredImage by default
    ctx.query.populate = {
      ...ctx.query.populate,
      featuredImage: true
    };

    const response = await super.findOne(ctx);
    return response;
  }
}));
