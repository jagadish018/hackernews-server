import type { Comment } from "@prisma/client";

export enum CommentStatus {
    POST_NOT_FOUND = "POST_NOT_FOUND",
    CREATED_SUCCEFULLY ="CREATE_SUCCESSFULLY",
  COMMENT_CREATION_FAILED = "COMMENT_CREATION_FAILED",
}

export type CommentCreateResult = {
  comment: Comment;
};
