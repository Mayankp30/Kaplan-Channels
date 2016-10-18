var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();
var path = __dirname + '/public/';
var file = __dirname + '/channel.json';

/**
 * Express configuration.
 */
app.use(express.static('public'));
app.use("/",router);

/**
 * Load index page
 */
router.get("/",function(req,res){
  res.sendFile(path + "views/index.htm");
 });

/**
 * Route to get all data
 */
router.get("/getData",function(req,res){
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);
  res.end(JSON.stringify(data));
  //console.dir(data);
});
})

/**
 * Start Express server.
 */

app.listen(5000,function(){
  console.log("Express server listening to port 5000");
  console.log("server started **");
});
