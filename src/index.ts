import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { allRoutes } from "./routes/routes";

// Create top-level app
const app = new Hono();

// Apply CORS globally
app.use(
  "*",
  cors({
    origin: "https://hackernews-ui-flax.vercel.app",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Mount your routes
app.route("/", allRoutes);

// Serve
serve(app, (info) => {
  console.log(`SERVER RUNNING ON PORT ${info.port}`);
});
