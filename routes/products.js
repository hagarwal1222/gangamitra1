var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('products/products', { title: 'Express'});
});

router.get('/productlist', function (req, res) {
    var db = req.db;
    var collection = db.get('productlister');
    collection.find({},{}, function (err, data) {
        res.json(data);
    });
});

router.get('/productgallery', function(req, res, next) {
    res.render('products/productgallery', { title: 'Express'});
});

module.exports = router;
