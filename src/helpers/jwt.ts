import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (require: Request, response: Response, next: NextFunction) => {

  const token = require.headers.authorization as string;
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, process.env.SECRET) as any;
    response.locals.jwtPayload = jwtPayload;
  } catch (error) {

    response.status(401).send('invalid token');
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, process.env.SECRET, {
    expiresIn: '30d',
  });
  response.setHeader('token', newToken);

  next();
};
