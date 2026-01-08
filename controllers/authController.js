const jwt = require('jsonwebtoken');

const SECRET_KEY = 'my_super_secret_key'; 

exports.login = (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send('Вкажіть ім’я користувача');
    }

    // Геренація токена (на 1 годину)
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    
    res.cookie('auth_token', token, { 
        httpOnly: true, 
        maxAge: 3600000
    });

    res.send('Ви успішно увійшли! Токен збережено в Cookies.');
};

exports.logout = (req, res) => {
    res.clearCookie('auth_token');
    res.send('Ви вийшли з системи');
};