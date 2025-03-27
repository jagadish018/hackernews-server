import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { usersRoutes } from "./user-routes";
import { postsRoutes } from "./post-routes";
import { likeRoutes } from "./likes-routes";

export const allRoutes = new Hono();

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes)
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
