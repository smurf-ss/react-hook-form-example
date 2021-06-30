const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  // Configure path alias
  addWebpackAlias({
    "@app": path.resolve(__dirname, "src"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@routes": path.resolve(__dirname, "src/routes"),
  })
);
