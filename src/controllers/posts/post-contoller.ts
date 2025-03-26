import { prisma } from "../../extras/prisma";
import { PostStatus, type PostCreate } from "./post-type";

export const createPost = async (parameters: {
  title: string;
  content: string;
  authorId: string | undefined; // user id from token or session
}): Promise<PostCreate | PostStatus> => {
  try {
    if (!parameters.authorId) {
      return PostStatus.USER_NOT_FOUND;
    }

    const post = await prisma.post.create({
      data: {
        title: parameters.title,
        content: parameters.content,
        author: {
          connect: { id: parameters.authorId },
        },
      },
    });

    return { post };
  } catch (error) {
    console.error(error);
    return PostStatus.POST_CREATION_FAILED;
  }
};