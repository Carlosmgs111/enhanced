import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless"; // ← Importa el adaptador correcto
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  adapter: vercel(),
  integrations: [tailwind(), react()],
  output: "server" // ← Asegura esto también
});
