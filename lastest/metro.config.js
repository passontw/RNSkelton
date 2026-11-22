const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 啟用 ESM package exports 支援，color v5 等 ESM-only 套件需要此設定
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
