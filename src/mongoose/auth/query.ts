import { UserModel } from "./schema";

export async function createUser(input: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}) {
  await UserModel.create({
    firstName: input.firstName,
    lastName: input.lastName,
    username: input.username,
    password: input.password,
    email: input.email,
  });
}

export async function getUserByEmail(email: string) {
  const user = await UserModel.findOne({
    email,
  });
  return user;
}

export async function getUserByUsername(username: string) {
  const user = await UserModel.findOne({
    username,
  });
  return user;
}
