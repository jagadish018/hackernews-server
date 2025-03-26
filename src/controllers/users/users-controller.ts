import { prisma } from "../../extras/prisma";
import { GetAllUsersError, GetMeError, type GetAllUsersResult, type GetMeResult } from "./users-type";


export const GetMe = async (parameters: {
  userId: string;
}): Promise<GetMeResult> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parameters.userId },
    });

    if (!user) {
      throw GetMeError.USER_NOT_FOUND;
    }

    const result: GetMeResult = {
      user: user,
    };

    return result;
  } catch (e) {
    console.error(e);
    throw GetMeError.UNKNOWN;
  }
};

export const GetUsers = async (parameter: {
  page: number;
  limit: number;
}): Promise<GetAllUsersResult> => {
  try {
    const { page, limit } = parameter;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      skip,
      take: limit,
    });

    if (!users || users.length === 0) {
      throw GetAllUsersError.NO_USERS_FOUND;
    }

    return { users };
  } catch (e) {
    console.error(e);
    throw GetAllUsersError.UNKNOWN;
  }
};
