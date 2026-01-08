const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_super_secret_key';

const verifyJWT = (req, res, next) => {
    const token = req.cookies.auth_token;
    
    if (!token) {
        return res.status(401).send('Доступ заборонено: токен відсутній');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).send('Невалідний токен');
    }
};

module.exports = verifyJWT;