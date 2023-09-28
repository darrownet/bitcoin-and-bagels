const path = require("path");

module.exports = {
  src: path.resolve(__dirname, "../../src"),

  build: path.resolve(__dirname, "../../fe-proxy-server/build"),

  publicPath: path.resolve(__dirname, "/"),
};
