import { router as chatRouter } from "./modules/chat";
import  dottedFontRouter  from "./modules/dotted-font";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRouter.router);
app.use("/api/dotted-font", dottedFontRouter);
app.listen(3000, () => {
  console.log("🚀 Server started on port 3000");
});
