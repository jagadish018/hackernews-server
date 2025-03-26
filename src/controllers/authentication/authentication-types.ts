import type { User } from "@prisma/client";

export enum SignUpWithUsernameAndPasswordError {
    CONFLICTING_USERNAME = "CONFILCTING_USERNAME",
    UNKNOWN = "UNKNOWN",
}

export type SignUpWithUsernameAndPasswordResult = {
  token: string;
  user: User;
};

export enum LoginWithUsernameAndPasswordError {
  INCORRECT_USERNAME_OR_PASSWORD = "INCORRECT_USERNAME_OR_PASSWORD",
  CONFLICTING_PASSWORD = "INVALID_PASSWORD",
}
export type LoginWithUsernameAndPasswordResult = {
  token: string;
  user: User;
};
