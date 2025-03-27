export enum LikeStatus {
  ALREADY_LIKED = "ALREADY_LIKED",
  LIKE_SUCCESS = "LIKE_SUCCESS",
  UNKNOWN = "UNKNOWN",
  POST_NOT_FOUND = "POST_NOT_FOUND",
}

export type LikeCreate = {
  status: LikeStatus;
};
