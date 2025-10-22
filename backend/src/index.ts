import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import router from "./routes/app-routes";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api/entry", router);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
