import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.auth.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import dbConnect from "./db/db_connect.js";
import blogRouter from "./routes/blogs.auth.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/user", userRouter);
app.use("/api/blog",blogRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => res.send("Welcome to blogs"));

await dbConnect();

app.listen(process.env.PORT, () =>
  console.log(`Server Running On ${process.env.PORT}`)
);
