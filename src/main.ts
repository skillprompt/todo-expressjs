import express, { Request, Response, NextFunction } from "express";
import {
  createTodoController,
  getAllTodoController,
  getTodoController,
} from "./controllers/todo-controller";
import { createDBConnection } from "./mongoose/db";
import {
  loginController,
  signupController,
} from "./controllers/auth-controller";

const PORT = 4000;

createDBConnection()
  .then((db) => console.log("connected to db"))
  .catch((err) => {
    console.error("failed to connect to db", err);
  });

const app = express();

app.use(express.json());

// Authentication feature
// signup flow
app.post("/auth/signup", signupController);

// login flow
app.post("/auth/login", loginController);

app.get("/get-todo/:todoId", getTodoController); // done
app.post("/create-todo", createTodoController); // done
app.post("/update-todo/:todoId", createTodoController);
app.delete("/delete-todo", getTodoController);
app.get("/get-all-todos", getAllTodoController); // done

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
