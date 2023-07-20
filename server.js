import {createServer} from "http";
import {parse} from "url";
import next from "next";
import connectToDB from "./database";

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

connectToDB().then(() => {
  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) throw err;
    });
  });
});
