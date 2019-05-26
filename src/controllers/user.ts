import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {getManager} from 'typeorm';
import {User} from '../entity/User';

export async function createUser(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);

    const newUser = userRepository.create(request.body);

    await userRepository.save(newUser);

    response.send(newUser);
}

export async function getUsers(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    response.send(users);
}

export async function getUser(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);

    if (!user) {
        response.status(404);
        response.end();
        return;
    }
    response.send(user);
}

export async function updateUser(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(request.params.id);
    // const categories = await categoryRepository.findByIds(request.body.categories);
    // request.body.categories = categories;

    // if post was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    // post.title = request.body.title || post.title;
    // post.text = request.body.text || post.text;
    // post.categories = request.body.categories || post.categories;

    await userRepository.save(user);

    response.send(user);
}

export async function deleteUser(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);

    // if post was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    await userRepository.remove(user);

    response.send(user);
}

export async function login(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ where: {username: request.body.username}});

    // if post was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    console.log(request.body.password);

    const isValid =  await user.comparePassword(request.body.password);

    if (isValid) {
        console.log(request.body.password);
        response.send(isValid);
    }

    response.send(request.body.password);

}
