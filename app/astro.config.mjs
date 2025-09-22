import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless"; // ← Importa el adaptador correcto
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

const nodeAdapter = node({
  mode: "standalone",
});

const vercelAdapter = vercel({});

const adapter =
  process.env.PUBLIC_VERCEL_ENV === "production" ? vercelAdapter : nodeAdapter;

export default defineConfig({
  adapter,
  integrations: [tailwind(), react()],
  output: "server" // ← Asegura esto también
});
