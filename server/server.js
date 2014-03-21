// Basically find and replace 'wine' with 'content' here:
// http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/

var express = require('express'),
    contentApi = require('./contentapi');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
var baseContentUrl = '/api/v1/content';
app.get(baseContentUrl, contentApi.findAll);
app.get(baseContentUrl + '/:id', contentApi.findById);
app.post(baseContentUrl, contentApi.addContent);
app.put(baseContentUrl + '/:id', contentApi.updateContent);
app.delete(baseContentUrl + '/:id', contentApi.deleteContent);
 
app.listen(8080);
console.log('Listening on port 8080...');
