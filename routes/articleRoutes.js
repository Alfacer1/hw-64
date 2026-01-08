const express = require('express');
const router = express.Router();
const checkAccess = require('../middlewares/articleMiddleware');
const articleController = require('../controllers/articleController');

// Мідлвар для перевірки прав
router.use(checkAccess);

router.get('/', articleController.getAllArticles);
router.post('/', articleController.createArticle);
router.get('/:articleId', articleController.getArticleById);
router.put('/:articleId', articleController.updateArticle);
router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;