exports.login = passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login'
});

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};