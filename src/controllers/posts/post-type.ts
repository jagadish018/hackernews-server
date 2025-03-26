import type { Post } from "@prisma/client";

export type PostCreate = {
  post: Post;
};

export enum PostStatus {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  POST_CREATED = "POST_CREATED",
  POST_CREATION_FAILED = "POST_CREATION_FAILED",
}
