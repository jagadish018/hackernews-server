import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import {
  createPost,
  getAllPosts,
  getPostsByUser,

} from "../controllers/posts/post-contoller";
import { GetPostsError, PostStatus } from "../controllers/posts/post-type";

export const postsRoutes = new Hono();
postsRoutes.post("/", tokenMiddleware, async (context) => {
  try {
    const userId = context.get("userId"); //From tokenMiddleware
    if (!userId) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    const { title, content } = await context.req.json(); // Removed userId from here

    if (!title || !content) {
      return context.json({ error: "Title and Content are required" }, 400);
    }

    const result = await createPost({
      title,
      content,
      authorId: userId, //Use authenticated userId only
    });

    if (result === PostStatus.USER_NOT_FOUND) {
      return context.json({ error: "User not found" }, 404);
    }

    if (result === PostStatus.POST_CREATION_FAILED) {
      return context.json({ error: "Post creation failed" }, 500);
    }

    return context.json(result, 201); //  Post created
  } catch (error) {
    console.error(error);
    return context.json({ error: "Server error" }, 500);
  }
});

// GET /posts - Paginated, reverse chronological
postsRoutes.get("/", tokenMiddleware, async (context) => {
  try {
    const page = parseInt(context.req.query("page") || "1", 10);
    const limit = parseInt(context.req.query("limit") || "2", 10);

    const result = await getAllPosts({ page, limit });
    if (!result) {
      return context.json({ error: "Users not found" }, 404);
    }

    return context.json(result, 200);
  } catch (error) {
    if (error === GetPostsError.NO_POSTS_FOUND) {
      return context.json({ error: "No posts found" }, 404);
    }
    console.error(error);
    return context.json({ error: "Server error" }, 500);
  }
});

//Get all posts in reverse chronological order of the current user
postsRoutes.get("/me", tokenMiddleware, async (context) => {
  try {
    const userId = context.get("userId");
    const page = parseInt(context.req.query("page") || "1", 10);
    const limit = parseInt(context.req.query("limit") || "2", 10);
    const result = await getPostsByUser({ userId, page, limit });

    if (!result) {
      return context.json({ error: "No posts found" }, 404);
    }

    return context.json(result, 200);
  } catch (error) {
    console.error(error);
    return context.json({ error: "Server error" }, 500);
  }
});
