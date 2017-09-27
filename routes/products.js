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
    collection.insert({'name': req.body.name, 'email': req.body.email, 'phone': req.body.phone, 'address': req.body.address}, function (err, result) {

    });
    var collection =  db.get('orders');
    collection.insert({'name': req.body.name, 'email': req.body.email, 'phone': req.body.phone, 'address': req.body.address}, function (err, result) {
        var collection =  db.get('requested_products');
        req.body['product_ids[]'].forEach(function(value){
            collection.insert({'productlister_id': value, 'order_id': result._id}, function (err, result) {

            });
        });
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
