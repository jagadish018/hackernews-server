import type { Post } from "@prisma/client";

export type PostCreateResult = {
  post: Post;
};

export enum PostStatus {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  POST_CREATED = "POST_CREATED",
  POST_CREATION_FAILED = "POST_CREATION_FAILED",
}

export type GetPostsResult = {
  posts: Post[];
};

export enum GetPostsError {
  NO_POSTS_FOUND = "NO_POSTS_FOUND",
  UNKNOWN = "UNKNOWN",
}
