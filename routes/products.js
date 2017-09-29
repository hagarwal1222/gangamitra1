var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('products/products', { title: 'Express'});
});

/* GET Product listing. */
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
        if (req.body['product_ids[]'][0].length != 1){
            req.body['product_ids[]'].forEach(function(value){
                collection.insert({'productlister_id': value, 'order_id': (result._id).toHexString()}, function (err, result) {
                });
            });
        }else{
            collection.insert({'productlister_id': req.body['product_ids[]'], 'order_id': (result._id).toHexString()}, function (err, result) {
            });
        }
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
