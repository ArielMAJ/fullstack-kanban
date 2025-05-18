import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} ${
        res.statusCode
      } - ${duration}ms`
    );
    if (req.body) {
      console.log("Request Body:", req.body);
    }
  });

  next();
};

export default loggerMiddleware;
