
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config"); // Load .env only in development
}

import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes";

serve(allRoutes, (info) => {
  console.log(`SERVER RUNNING ON PORT ${info.port}`);
});
