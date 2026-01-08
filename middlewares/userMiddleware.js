exports.authenticate = (req, res, next) => {
    console.log("Автентифікація користувача...");
    next();
};

exports.validateUser = (req, res, next) => {
    console.log("Валідація даних користувача...");
    next();
};