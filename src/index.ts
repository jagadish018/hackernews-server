if (process.env.NODE_ENV !== "production") {
  require("dotenv/config"); // Load .env only in development
}
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { allRoutes } from "./routes/routes";

// Create top-level app
const app = new Hono();

// CORS middleware
app.use(
  "*",
  cors({
    origin: "https://hackernews-ui-flax.vercel.app", // ✅ Only allow your frontend
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Mount API routes
app.route("/api", allRoutes);

// Start server
serve(app, (info) => {
  console.log(`🚀 SERVER RUNNING ON PORT ${info.port}`);
});
