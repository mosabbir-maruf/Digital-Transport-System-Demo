import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 1182,
  },
  plugins: [
    react(),
    // Plugin to replace relative URLs with absolute URLs in HTML for social media meta tags
    {
      name: "html-meta-url-replace",
      transformIndexHtml(html) {
        // Get site URL from environment variable (Vercel provides VERCEL_URL)
        const siteUrl =
          process.env.VITE_SITE_URL ||
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.VITE_SITE_URL || "";

        if (siteUrl) {
          // Replace relative image URLs with absolute URLs in meta tags
          return html.replace(
            /(content=["'])\/meta-graph\.png(["'])/g,
            `$1${siteUrl}/meta-graph.png$2`
          );
        }
        return html;
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // React Query
          "react-query": ["@tanstack/react-query"],
          // Radix UI components (grouped together as they're often used together)
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
          ],
          // Animation libraries
          "animation": ["framer-motion"],
          // Chart library
          "charts": ["recharts"],
          // Form libraries
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          // Date utilities
          "date-utils": ["date-fns", "react-day-picker"],
          // UI utilities
          "ui-utils": [
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "tailwindcss-animate",
          ],
          // Other UI libraries
          "ui-libs": [
            "cmdk",
            "embla-carousel-react",
            "input-otp",
            "lucide-react",
            "next-themes",
            "react-resizable-panels",
            "sonner",
            "vaul",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
