
import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import userRoute from "./routes/userRoute"
import blogRoute from "./routes/blogRoute"
import commentRoute from "./routes/commentRoute"
import cors from "cors"
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin:"http://localhost:3000", credentials : true }));

const PORT =  5000;
app.get("/", (req:Request,res:Response)=>{
  return res.send("Hi there")
})

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/comments",commentRoute);

app.use(errorHandler)

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})
