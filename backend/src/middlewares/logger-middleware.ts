import { Request, Response, NextFunction } from 'express';

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const now = new Date();
  const requestLogMessage = `
  [METHOD]: ${req.method} 
  [URL]: ${req.url} 
  [INVOCATION-DATE]: ${now.toLocaleDateString()} - ${now.toLocaleTimeString()}
  [REFERER]: ${req.get('Referer')}
  `;
  console.log(requestLogMessage);
  return next();
};
