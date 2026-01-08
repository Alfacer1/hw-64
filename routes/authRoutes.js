const express = require('express');
const router = express.Router();
const passport = require('passport');

// Обробка форми логіна
router.post('/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login'
}));

// Вихід (додаємо сюди ж, щоб працювало через /auth/logout)
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;