const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
module.exports = {
  webpack(config, env) {
    config = injectBabelPlugin(["import", { libraryName: "antd", style: true }], config);
    config = rewireLess.withLoaderOptions({
      modifyVars: { "@border-radius-base": "10px" },
      javascriptEnabled: true,
    })(config, env);
    return config;
  },
  devServer(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      config.proxy = {
        "/api": {
          target: process.env.REACT_APP_API_DOMAIN,
          changeOrigin: true,
        },
        "/event": {
          target: process.env.REACT_APP_API_DOMAIN,
          changeOrigin: true,
        },
        '/orderApi': {
          target: 'https://[::1]:44309',
          secure: false
        },
      };

      config.compress = false;

      return config;
    };
  },
};
