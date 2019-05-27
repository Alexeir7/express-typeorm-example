import app from './app';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './controllers/category';
import { createPost, deletePost, getPost, getPosts, updatePost } from './controllers/post';
import { createUser, deleteUser, getUser, getUsers, login, updateUser } from './controllers/user';
import { checkRole } from './helpers/checkRole';
import { checkJwt } from './helpers/jwt';

app.get('/', (req, res) => {
    res.send({
        liu: 'Laureate International Universities',
    });
});

app.get('/category', getCategories);
app.get('/category/:id', getCategory);
app.post('/category', [checkJwt, checkRole(['ADMIN', 'EDITOR'])], createCategory);
app.put('/category/:id', [checkJwt, checkRole(['ADMIN', 'EDITOR'])], updateCategory);
app.delete('/category/:id', [checkJwt, checkRole(['ADMIN', 'EDITOR'])], deleteCategory);

app.get('/post', getPosts);
app.get('/post/:id', getPost);
app.post('/post', [checkJwt, checkRole(['ADMIN', 'EDITOR'])], createPost);
app.put('/post/:id', [checkJwt, checkRole(['ADMIN', 'EDITOR'])], updatePost);
app.delete('/post/:id', [checkJwt, checkRole(['ADMIN', 'EDITOR'])], deletePost);

app.get('/user', [checkJwt, checkRole(['ADMIN'])], getUsers);
app.get('/user/:id', [checkJwt, checkRole(['ADMIN'])], getUser);
app.put('/user/:id', [checkJwt, checkRole(['ADMIN'])], updateUser);
app.delete('/user/:id', [checkJwt, checkRole(['ADMIN'])], deleteUser);

app.post('/signup', createUser);
app.post('/login', login);
