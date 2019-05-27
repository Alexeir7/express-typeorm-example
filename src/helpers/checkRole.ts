import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';

export const checkRole = (roles: string[]) => {
  return async (request: Request, reponse: Response, next: NextFunction) => {
    const id = reponse.locals.jwtPayload.userId;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      reponse.status(401).send('Unathorized');
    }

    // Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) { next(); } else { reponse.status(401).send(); }
  };
};
