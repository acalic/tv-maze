const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@src": "src",
    "@app": "src/app",
    "@routes": "src/app/routes",
    "@components": "src/components",
    "@pages": "src/pages",
    "@utils": "src/utils",
  })(config);

  return config;
};
