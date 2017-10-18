var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('xpgadminpanel/indexadmin', { title: 'Express'});
});

router.post('/addproduct', function(req, res){
    var db = req.db;
    var collection =  db.get('productlister');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

router.get('/orders', function (req, res) {
    var db = req.db;
    var collection = db.get('orders');
    collection.find({},{}, function (err, data) {
        res.json(data);
    });
});

router.get('/orderdetail/:id', function (req, res) {
    var products = {};
    var db = req.db;
    var collection = db.get('requested_products');
    collection.find({order_id: req.params.id},{}, function (err, data) {
        data.forEach(function(element)
        {
            var collection = db.get('productlister');
            collection.findOne({_id: element.productlister_id},{}, function (err, prod) {
                products[element.productlister_id]= prod.name;
            });
        });
        setTimeout(function () { //====================USE ASYNC INSTED
            res.render('xpgadminpanel/orderdetail', { order: data, products_hash: products, title: 'Order Details' });
        }, 1000)
    });
});

module.exports = router;