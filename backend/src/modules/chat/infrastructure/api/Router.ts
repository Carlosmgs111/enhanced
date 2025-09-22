import express, { Request, Response } from "express";
import { ChatUseCases } from "../../application/ChatUseCases";
import { Readable } from "stream";

export class Router {
  router: express.Router;
  constructor(chatUseCases: ChatUseCases) {
    this.router = express.Router();
    this.query(chatUseCases);
    this.getResponse(chatUseCases);
    this.createNewChat(chatUseCases);
  }
  query(chatUseCases: ChatUseCases) {
    this.router.post("/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { message, chat } = await req.body;
        console.log({ message, chat });
        if (!id) {
          return res.status(400).json({ error: "Chat ID is required" });
        }
        if (!message) {
          return res.status(400).json({ error: "Message is required" });
        }
        await chatUseCases.createNewChat({ id, ...chat }, message);
        return res.status(200).json({ id, message });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    });
  }

  getResponse(chatUseCases: ChatUseCases) {
    this.router.get("/:id", async (req: Request, res: Response) => {
      console.log("Getting response");
      try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ error: "Chat ID is required" });
        }
        res.setHeaders(
          new Headers({
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Cache-Control",
          })
        );
        const sseStream = new Readable({
          read() {},
        });
        const sendData = (data: string) => {
          const formattedData = `data: ${JSON.stringify({ data: data })}\n\n`;
          sseStream.push(formattedData);
        };
        sseStream.pipe(res);
        const isDone = await chatUseCases.response(id as string, sendData);
        if (isDone) {
          sseStream.push(null); // Finalizar el stream
        }
        req.on("close", () => sseStream.destroy());
        req.on("aborted", () => sseStream.destroy());
        sseStream.on("error", (err) => {
          if (!res.headersSent) {
            res.status(500).json({ error: "Stream error" });
          }
        });
      } catch (error: any) {
        if (res.headersSent) {
          const errorStream = new Readable({
            read() {},
          });
          errorStream.push(
            `data: ${JSON.stringify({ error: error.message })}\n\n`
          );
          errorStream.push(null);
          errorStream.pipe(res);
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    });
  }

  createNewChat(chatUseCases: ChatUseCases) {
    this.router.patch("/:id", async (req: Request, res: Response) => {
      console.log("Making question");
      try {
        const { id } = req.params;
        const { message } = await req.body;
        if (!id) {
          return res.status(400).json({ error: "Chat ID is required" });
        }
        if (!message) {
          return res.status(400).json({ error: "Message is required" });
        }
        const result = await chatUseCases.query(id as string, message);
        return res.status(200).json({ id, result });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    });
  }
}
