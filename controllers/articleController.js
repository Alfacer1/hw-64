exports.getAllArticles = (req, res) => {
    res.render('articles/index.ejs'); // Рендеримо EJS
};

exports.createArticle = (req, res) => {
    res.send("Post articles route");
};

exports.getArticleById = (req, res) => {
    res.render('articles/detail.ejs', { articleId: req.params.articleId });
};

exports.updateArticle = (req, res) => {
    res.send(`Put article by Id route: ${req.params.articleId}`);
};

exports.deleteArticle = (req, res) => {
    res.send(`Delete article by Id route: ${req.params.articleId}`);
};