import { Hono } from "hono";
import { usersRoutes } from "./user-routes";
import { postsRoutes } from "./post-routes";
import { likeRoutes } from "./likes-routes";
import { commentRoutes } from "./comments-routes";
import { logger } from "hono/logger";
import { swaggerRoutes } from "./swagger-routes";
import { authRoute } from "./middlewares/session-middleware";

export const allRoutes = new Hono();

allRoutes.use(logger());

allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
allRoutes.route("/comments", commentRoutes);
allRoutes.route("/ui", swaggerRoutes);
allRoutes.route("/api/auth", authRoute);


