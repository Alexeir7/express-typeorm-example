import app from './app';
import { getAll as getCategories, getOne as getCategory, post as createCategory, put as updateCategory, remove as deleteCategory } from './controllers/category';
import { getAll as getPosts, getOne as getPost, post as createPost, put as updatePost, remove as deletePost } from './controllers/post';

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
