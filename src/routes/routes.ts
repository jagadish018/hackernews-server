import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { usersRoutes } from "./user-routes";
import { postsRoutes } from "./post-routes";
import { likeRoutes } from "./likes-routes";
import { commentRoutes } from "./comments-routes";
import { logger } from "hono/logger";
import { swaggerRoutes } from "./swagger-routes";
import { authRoute } from "./middlewares/session-middleware";
import { cors } from "hono/cors";

export const allRoutes = new Hono();
allRoutes.use(logger());
allRoutes.use(
  cors({
    origin: "https://hackernews-ui-flax.vercel.app",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
allRoutes.route("/comments", commentRoutes);
allRoutes.route("/ui", swaggerRoutes);
allRoutes.route("/api/auth", authRoute);




allRoutes.get("", (context) => {
  return context.json({ message: "Hello, World" }, 200);
});
