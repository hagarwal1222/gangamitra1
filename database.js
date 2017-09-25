// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/gangamitra1";
//
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var myobj = [
//         { name: 'John', description: 'Highway 71'},
//         { name: 'Peter', description: 'Lowstreet 4'},
//         { name: 'Amy', description: 'Apple st 652'},
//         { name: 'Hannah', description: 'Mountain 21'},
//         { name: 'Michael', description: 'Valley 345'},
//         { name: 'Sandy', description: 'Ocean blvd 2'},
//         { name: 'Betty', description: 'Green Grass 1'},
//         { name: 'Richard', description: 'Sky st 331'},
//         { name: 'Susan', description: 'One way 98'},
//         { name: 'Vicky', description: 'Yellow Garden 2'},
//         { name: 'Ben', description: 'Park Lane 38'},
//         { name: 'William', description: 'Central st 954'},
//         { name: 'Chuck', description: 'Main Road 989'},
//         { name: 'Viola', description: 'Sideway 1633'}
//     ];
//     db.collection("productlister").insertMany(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });
// });