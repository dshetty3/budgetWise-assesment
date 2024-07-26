const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    // Enable CSS source maps
    sourceMap: true,
    loaderOptions: {
      css: {
        // CSS loader options here
      },
      postcss: {
        // PostCSS loader options here
      }
    },
    // Disable CSS extraction and minification temporarily
    extract: false,
  },
});
