import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import { getAllTodos } from "../database";

export function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.params.todoId;

  if (!todoId) {
    next("Please provide valid todoId");
    return;
  }

  const myTodoModel = new TodoModel();

  const todo = myTodoModel.getTodo(parseInt(todoId as string));

  if (!todo) {
    res.status(404).json({
      messagge: "todo not found",
    });
    return;
  }

  res.json({
    data: todo,
  });
}

export function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("request", req);
  const body = req.body;

  console.log("body", body);

  const name = body.name;
  const status = body.status;

  // !FIXME: write error handling and data validation

  const myTodoModel = new TodoModel();
  const createdTodo = myTodoModel.createTodo(name, status);

  res.status(201).json({
    data: createdTodo,
    message: "Todo is created successfully!!",
  });
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
