import app from './app';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './controllers/category';
import { createPost, deletePost, getPost, getPosts, updatePost } from './controllers/post';

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
