if (process.env.NODE_ENV !== "production") {
  require("dotenv/config"); // Load .env only in development
}
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { allRoutes } from "./routes/routes";

// Create top-level app
const app = new Hono();


// Serve
serve(app, (info) => {
  console.log(`SERVER RUNNING ON PORT ${info.port}`);
});
