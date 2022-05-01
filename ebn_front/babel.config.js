module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["react-native"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};
