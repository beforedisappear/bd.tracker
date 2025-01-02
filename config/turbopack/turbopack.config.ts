import type { ExperimentalTurboOptions } from "next/dist/server/config-shared";

export const TurbopackConfig: ExperimentalTurboOptions = {
  // treeShaking: true,
  rules: {
    // "*.a.svg": {
    //   loaders: ["@svgr/webpack"],
    //   as: "*.js",
    // },
    "*.svgr": {
      loaders: ["@svgr/webpack"],
      as: "*.js",
    },
  },
  resolveExtensions: [
    ".mdx",
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".mjs",
    ".json",
    ".svgr",
  ],
};
