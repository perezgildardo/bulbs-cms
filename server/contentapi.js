var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bulbsdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'bulbsdb' database");
        db.collection('content', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'content' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    } else {
        console.log('Error connecting to db: ' + err);
    }
});

function populateDB() {
    var content = [{
        'polymorphic_ctype': 'article',
        'title': 'What an article!',
        'published': new Date(),
        'body': 'And a body to match!'
    }, {
        'polymorphic_ctype': 'article',
        'title': '29 Ways You Are Not Pleasing Your Woman',
        'published': new Date(),
        'body': 'Placeholder listicle'
    }];
    db.collection('content', function(err, collection) {
        collection.insert(content, {safe:true}, function(err, result) {});
    });
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving content: ' + id);
    db.collection('content', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('content', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addContent = function(req, res) {
    var content = req.body;
    console.log('Adding content: ' + JSON.stringify(content));
    db.collection('content', function(err, collection) {
        collection.insert(content, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'' + err});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateContent = function(req, res) {
    var id = req.params.id;
    var content = req.body;
    console.log('Updating content: ' + id);
    console.log(JSON.stringify(content));
    db.collection('content', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, content, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating content: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(content);
            }
        });
    });
}
 
exports.deleteContent = function(req, res) {
    var id = req.params.id;
    console.log('Deleting content: ' + id);
    db.collection('content', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}