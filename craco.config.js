const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "~utils": path.resolve(__dirname, "src/utils"),
      "~constants": path.resolve(__dirname, "src/constants"),
      "~hooks": path.resolve(__dirname, "src/hooks"),
      "~types": path.resolve(__dirname, "src/types"),
      "~api": path.resolve(__dirname, "src/api"),
      "~entities": path.resolve(__dirname, "src/entities")
    },
  },
};
