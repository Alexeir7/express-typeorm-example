import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {getManager} from 'typeorm';
import {User} from '../entity/User';

export async function createUser(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);

    const { username, password, role } = request.body;

    const user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    user.hashPassword();

    try {
        await userRepository.save(user);
      } catch (e) {
        response.status(409).send('username already in use');
        return;
      }

    response.status(201).send('User created');
}

export async function getUsers(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find({
        select: ['id', 'username', 'role'],
      });

    response.send(users);
}

export async function getUser(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id, {select: ['id', 'username', 'role']});

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

    response.status(204).send();
}

export async function login(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);

    const { username, password } = request.body;

    if (!(username && password)) {
      response.status(400).send();
    }

    const user = await userRepository.findOne({ where: { username } });

    // if post was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    if (!user.IsValid(password)) {
        response.status(401).send();
        return;
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.SECRET,
        { expiresIn: '30d' },
    );

    response.send(token);

}
