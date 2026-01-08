const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Тут має бути пошук користувача в базі
    // Для ДЗ зробимо фейкову перевірку:
    if (email === 'user@example.com' && password === '123') {
        return done(null, { id: 1, email: 'user@example.com' });
    }
    return done(null, false, { message: 'Невірний email або пароль' });
}));

// Серіалізація (збереження ID в сесію)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    // Пошук в базі за ID
    done(null, { id: 1, email: 'user@example.com' });
});