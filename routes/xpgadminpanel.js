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

module.exports = router;