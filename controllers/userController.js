exports.getAllUsers = (req, res) => {
    res.render('users/index.pug');
};
exports.createUser = (req, res) => res.send("Post users route");
exports.getUserById = (req, res) => {
    res.render('users/detail.pug', { userId: req.params.userId });
};
exports.updateUser = (req, res) => res.send(`Put user by Id route: ${req.params.userId}`);
exports.deleteUser = (req, res) => res.send(`Delete user by Id route: ${req.params.userId}`);