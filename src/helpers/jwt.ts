import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (require: Request, response: Response, next: NextFunction) => {

  let token = require.headers.authorization as string;
  let jwtPayload;

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    jwtPayload = jwt.verify(token, process.env.SECRET) as any;
    response.locals.jwtPayload = jwtPayload;
  } catch (error) {

    response.status(401).send('invalid token');
    return;
  }

  const { userId, username, role } = jwtPayload;
  const newToken = jwt.sign({ userId, username, role }, process.env.SECRET, {
    expiresIn: '30d',
  });
  response.setHeader('token', newToken);

  next();
};
