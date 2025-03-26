import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { usersRoutes } from "./user-routes";

export const allRoutes = new Hono();

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users",usersRoutes)

allRoutes.get("/ping", (c) => {
  return c.json({
    message: "pong",
  });
});
