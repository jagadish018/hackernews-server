import { prisma } from "../../extras/prisma";
import { LikeStatus, type LikeCreate } from "./like-types";

// Function to create a like on a post
export const createLike = async (params: {
  postId: string;
  userId: string;
}): Promise<LikeCreate> => {
  try {
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
    });

    if (!post) {
      return { status: LikeStatus.POST_NOT_FOUND };
    }

    // Check if user has already liked this post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: params.postId,
        userId: params.userId,
      },
    });

    if (existingLike) {
      return { status: LikeStatus.ALREADY_LIKED };
    }

    // Create a new like
    await prisma.like.create({
      data: {
        postId: params.postId,
        userId: params.userId,
      },
    });

    return { status: LikeStatus.LIKE_SUCCESS };
  } catch (error) {
    console.error(error);
    return { status: LikeStatus.UNKNOWN };
  }
};
