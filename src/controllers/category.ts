import {Request, Response} from 'express';
import {getManager} from 'typeorm';
import {Category} from '../entity/Category';

export async function createCategory(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);

    const newCategory = categoryRepository.create(request.body);

    await categoryRepository.save(newCategory);

    response.send(newCategory);
}

export async function getCategories(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const categories = await categoryRepository.find( { relations: ['posts'] });

    response.send(categories);
}

export async function getCategory(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id, { relations: ['posts'] });

    // if category was not found return 404 to the client
    if (!category) {
        response.status(404);
        response.end();
        return;
    }

    response.send(category);
}

export async function updateCategory(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id);

    // if category was not found return 404 to the client
    if (!category) {
        response.status(404);
        response.end();
        return;
    }

    category.name = request.body.name || category.name;

    await categoryRepository.save(category);

    response.send(category);
}

export async function deleteCategory(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id);

    // if category was not found return 404 to the client
    if (!category) {
        response.status(404);
        response.end();
        return;
    }

    await categoryRepository.remove(category);

    response.send(category);
}
