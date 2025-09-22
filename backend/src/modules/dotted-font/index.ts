import { Router } from "express";
import fs from "fs";
import {join, dirname} from "path";

const router = Router();

const dottedDbPath = "/src/modules/dotted-font/db"
const rootProjectPath = dirname(dirname(dirname(__dirname)))
const dottedFontFilePath = join(rootProjectPath, dottedDbPath, "dotted-font-4_17x11.json")

router.get("/", (req, res) => {
  const fileContent = fs.readFileSync(dottedFontFilePath, "utf-8");
  res.json(JSON.parse(fileContent));
});

router.post("/", (req, res) => {
  const fileContent = fs.readFileSync(dottedFontFilePath, "utf-8");
  const data = JSON.parse(fileContent);
  const { character, matrix } = req.body;
  if (!character) {
    console.log("Character is required");
    return res.status(400).json({ error: "Character is required" });
  }
  if (!matrix) {
    console.log("Matrix is required");
    return res.status(400).json({ error: "Matrix is required" });
  }
  console.log({data});
  if (data[character]) {
    console.log("Character already exists");
    return res.status(400).json({ error: "Character already exists" });
  }
  data[character] = matrix;
  fs.writeFileSync(dottedFontFilePath, JSON.stringify(data));
  res.json(data);
});

export default router;
