const checkAccess = (req, res, next) => {
    console.log("Перевірка прав доступу до статті...");
    next();
};

module.exports = checkAccess;