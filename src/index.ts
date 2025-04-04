import "dotenv/config";
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes";


const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;

serve(allRoutes, (info) => {
  console.log(`SERVER RUNNING ON PORT ${info.port}`);
});
