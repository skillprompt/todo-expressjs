import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import { createTodo, getAllTodos, getTodoById } from "../database";
import { createTodoMongoDb } from "../mongoose/query";

export async function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.params.todoId;

  if (!todoId) {
    next("Please provide valid todoId");
    return;
  }

  // const myTodoModel = new TodoModel();

  // const todo = myTodoModel.getTodo(parseInt(todoId as string));

  // if (!todo) {
  //   res.status(404).json({
  //     messagge: "todo not found",
  //   });
  //   return;
  // }

  /**
   * Get the data from database
   */
  const result = (await getTodoById(parseInt(todoId))) as {
    id: number;
    name: string;
    created_at: Date;
  }[];

  console.log("result", result);

  if (!result.length) {
    res.status(404).json({
      message: "todo not found",
      data: null,
    });
  } else {
    res.json({
      message: "get todo by id",
      data: result[0],
    });
  }
}

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    console.log("body", body);

    const name = body.name;
    const description = body.description;

    // mysql database
    // const result = await createTodo(name);

    // mongodb database
    const result = await createTodoMongoDb(name, description);

    console.log("result", result);

    res.status(201).json({
      message: "todo created successfully",
      todo: result,
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}

function updateTodoController() {
  //
}

function deleteTodoController() {
  //
}

export async function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getAllTodos();

    res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
