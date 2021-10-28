const installObj = {
  react: require("./react"),
  babelPluginSyntaxDynamicImport: require("./@babel/plugin-syntax-dynamic-import"),
  babelCore: require("./@babel/core"),
};

const installKeys = Object.keys(installObj);

const hasInstall = installKeys.every((key) => installObj[key]);

if (!hasInstall) {
  throw new Error(
    "本插件依赖于:react、@babel/core、@babel/plugin-syntax-dynamic-import，请安装之后再使用"
  );
} else {
  module.exports = require("./lib/upload/index.js");
}
