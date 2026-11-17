import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.shmuzhian.cn",
  trailingSlash: "always",
  build: {
    format: "directory"
  }
});
