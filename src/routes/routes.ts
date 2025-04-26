import { Hono } from "hono";
import { usersRoutes } from "./user-routes";
import { postsRoutes } from "./post-routes";
import { likeRoutes } from "./likes-routes";
import { commentRoutes } from "./comments-routes";
import { logger } from "hono/logger";
import { authRoute } from "./middlewares/session-middleware";
import { cors } from "hono/cors";

export const allRoutes = new Hono();
allRoutes.use(
  "*",
  cors({
    origin: "https://hackernews-ui-flax.vercel.app", // ✅ Only allow your frontend
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Global logger
allRoutes.use(logger());

// Route groups
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
allRoutes.route("/comments", commentRoutes);
allRoutes.route("/api/auth", authRoute); 


