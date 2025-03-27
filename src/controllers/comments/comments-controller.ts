import { prisma } from "../../extras/prisma";
import { CommentStatus, type CommentCreateResult } from "./comments-type";

export const createCommentOnPost = async (params: {
  postId: string;
  userId: string;
  content: string;
}): Promise<CommentCreateResult | CommentStatus> => {
  try {
    // Check if the post exists
    const postExists = await prisma.post.findUnique({
      where: { id: params.postId },
    });

    if (!postExists) {
      return CommentStatus.POST_NOT_FOUND;
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: params.content,
        post: { connect: { id: params.postId } },
        user: { connect: { id: params.userId } },
      },
    });

    return { comment };
  } catch (error) {
    console.error(error);
    return CommentStatus.COMMENT_CREATION_FAILED;
  }
};
