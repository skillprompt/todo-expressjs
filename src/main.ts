import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import {
  createTodoController,
  getAllTodoController,
  getTodoController,
} from "./controllers/todo-controller";
import { createDBConnection } from "./mongoose/db";
import {
  loginController,
  logoutController,
  meController,
  signupController,
} from "./controllers/auth-controller";
import { checkAuth } from "./middlewares/check-auth";
import cors from "cors";

const PORT = 4000;

createDBConnection()
  .then((db) => console.log("connected to db"))
  .catch((err) => {
    console.error("failed to connect to db", err);
  });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // ACCESS-CONTROL-ALLOW-ORIGIN:http://localhost:5173
    credentials: true, // Access-Control-Allow-Credentials: allow
  })
);

app.use(express.json());
app.use(cookieParser());

// Authentication feature
// signup flow
app.post("/auth/signup", checkAuth, signupController);

// login flow
app.post("/auth/login", loginController);

// me route
app.get("/auth/me", checkAuth, meController);

// logout route
app.post("/auth/logout", logoutController);

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
