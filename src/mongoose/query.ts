import { TodoModel } from "./schema";

export async function createTodoMongoDb(name: string, description: string) {
  const result = await TodoModel.create({
    name,
    description,
  });

  console.log("created todo", result);

  return result;
}
