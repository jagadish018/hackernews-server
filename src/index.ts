import "dotenv/config"; // Load .env first
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { allRoutes } from "./routes/routes";

const app = new Hono();

app.route("/", allRoutes);

serve(app, (info) => {
  console.log(`🚀 SERVER RUNNING ON PORT ${info.port}`);
});
