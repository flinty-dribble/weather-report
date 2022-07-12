module.exports = (api) => ({
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        // caller.target will be the same as the target option from webpack
        corejs: "3",
        targets: api.caller((caller) => caller && caller.target === "node")
          ? { node: "current" }
          : { chrome: "58", ie: "11" },
      },
    ],
  ],
  plugins: [["@babel/transform-runtime"]],
});
