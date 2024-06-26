import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [alpinejs(), tailwind()],
  adapter: node({
    mode: "standalone"
  })
});
