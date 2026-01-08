const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Імпорт маршрутів та мідлварів
const logger = require('./middlewares/logger');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// --- 1. Налаштування шаблонізаторів (ДЗ 62.1) ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // EJS за замовчуванням

// --- 2. Глобальні Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Для обробки форм (КРИТИЧНО ТУТ)
app.use(cookieParser()); // Для Cookies (ДЗ 63.1)
app.use(express.static(path.join(__dirname, 'public'))); // Для Favicon та CSS (ДЗ 63.1)

// --- 3. Налаштування Сесій (ДЗ 63.2) ---
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true, 
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

// --- 4. Конфігурація Passport (ДЗ 63.2) ---
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    if (email === 'user@example.com' && password === '123') {
        return done(null, { id: 1, email: 'user@example.com' });
    } else {
        return done(null, false, { message: 'Невірний email або пароль' });
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id: 1, email: 'user@example.com' }));

// --- 5. Мідлвар захисту (ДЗ 63.2) ---
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).redirect('/login');
}

// --- 6. Маршрути ---

// Головна
app.get('/', logger, (req, res) => {
    res.send(`
        <h1>Вітаємо на сервері!</h1>
        <ul>
            <li><a href="/users">Користувачі (PUG)</a></li>
            <li><a href="/articles">Статті (EJS)</a></li>
            <li><a href="/protected">Захищена зона</a></li>
        </ul>
    `);
});

// Авторизація
app.get('/login', (req, res) => res.render('login'));
app.use('/auth', authRoutes);

// Тема (ДЗ 63.1)
app.post('/set-theme', (req, res) => {
    const { theme } = req.body;
    res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
    res.send(`Тему змінено на ${theme}`);
});

// Захищений контент
app.get('/protected', ensureAuthenticated, (req, res) => {
    res.render('protected', { user: req.user }); // Краще рендерити файл, ніж res.send
});

// Бізнес-логіка (ДЗ 62.1)
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));