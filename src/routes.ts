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

app.post('/category', createCategory);
app.get('/category', getCategories);
app.get('/category/:id', getCategory);
app.put('/category/:id', updateCategory);
app.delete('/category/:id', deleteCategory);

app.post('/post', createPost);
app.get('/post', getPosts);
app.get('/post/:id', getPost);
app.put('/post/:id', updatePost);
app.delete('/post/:id', deletePost);

app.get('/user', getUsers);
app.get('/user/:id', getUser);
app.put('/user/:id', updateUser);
app.delete('/user/:id', deleteUser);

app.post('/signup', createUser);
app.post('/login', login);
