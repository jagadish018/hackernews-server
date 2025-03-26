import { SignUpWithUsernameAndPasswordError, LoginWithUsernameAndPasswordError } from "./authentication-types";
import { type SignUpWithUsernameAndPasswordResult, type LoginWithUsernameAndPasswordResult } from "./authentication-types";
import { jwtSceretKey } from "../../../environment";
import { createHash } from "node:crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../../extras/prisma";

export const signUpWithUsernameAndPassword = async (username: string, password: string): Promise<SignUpWithUsernameAndPasswordResult> => {

    // Check if the username already exists
    const user = await prisma.user.findUnique({
        where: {
        username: username,
        },
    });
    
    if (user) {
        
        throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
       
    }
    
    // Create the user
    const newUser = await prisma.user.create({
        data: {
        username: username,
        password: createPasswordHash({ password }),
        },
    });
    
    // Generate token
    const token = createJWToken({
        id: newUser.id,
        username: newUser.username,
    });
    
    const result: SignUpWithUsernameAndPasswordResult = {
        user: newUser,
        token: token,

    };
    return result;
};


export const LoginWithUsernameAndPassword = async (username: string, password: string): Promise<LoginWithUsernameAndPasswordResult> => {
};

export const createPasswordHash = (parameters: {
  password: string;
}): string => {
  return createHash("sha256").update(parameters.password).digest("hex");
};

const createJWToken = (parameters: {id: string;username: string;}): string => {
  // Generate token
  const jwtPayload: jwt.JwtPayload = {
    iss: "https://purpleshorts.co.in",
    sub: parameters.id,
    username: parameters.username,
  };

  const token = jwt.sign(jwtPayload, jwtSceretKey, {
    expiresIn: "30d",
  });

  return token;
};