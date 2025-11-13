module.exports = (plugin) => {
  // Override default upload path
  if (process.env.NODE_ENV === 'production') {
    plugin.services.upload.getSettings = async () => {
      return {
        sizeLimit: 100000000, // 100MB
        provider: 'local',
        providerOptions: {},
        actionOptions: {}
      };
    };
  }

  return plugin;
};
