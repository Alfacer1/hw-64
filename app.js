const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', logger, (req, res) => {
    res.send(`
        <h1>Вітаємо на сервері!</h1>
        <ul>
            <li><a href="/users">Користувачі (PUG)</a></li>
            <li><a href="/articles">Статті (EJS)</a></li>
        </ul>
        <p>Для перевірки JWT та Cookies використовуйте Postman.</p>
    `);
});

app.post('/set-theme', (req, res) => {
    const { theme } = req.body; // 'light' / 'dark'
    res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
    res.send(`Тему змінено на ${theme}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));