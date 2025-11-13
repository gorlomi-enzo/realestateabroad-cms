module.exports = {
  // Before creating a new blog post
  async beforeCreate(event) {
    const { data } = event.params;

    // If primary_category is not set but categories array exists and has items
    if (!data.primary_category && data.categories && data.categories.length > 0) {
      data.primary_category = data.categories[0];
    }
  },

  // Before updating an existing blog post
  async beforeUpdate(event) {
    const { data } = event.params;

    // If primary_category is not set but categories array exists and has items
    if (!data.primary_category && data.categories && data.categories.length > 0) {
      data.primary_category = data.categories[0];
    }
  }
};
