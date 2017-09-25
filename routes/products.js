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

router.get('/buyproducts', function(req, res, next) {
    res.render('products/buyproducts', { title: 'Express'});
});

router.post('/order', function(req, res){
    var db = req.db;
    var collection =  db.get('contacts');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
