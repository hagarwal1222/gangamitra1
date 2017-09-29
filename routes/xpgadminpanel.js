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
    var collection = db.get('contacts');
    collection.find({},{}, function (err, data) {
        res.json(data);
    });
});

router.get('/orderdetail/:id', function (req, res) {
    console.log(req.params.id);
    var db = req.db;
    var collection = db.get('requested_products');
    collection.find({order_id: req.params.id},{}, function (err, data) {
        console.log(data);
        res.render('xpgadminpanel/orderdetail', { data: data, title: 'Order Details' });
    });
});

module.exports = router;