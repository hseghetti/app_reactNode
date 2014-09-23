var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
var fs = require("fs"),
    json;

var jsonPath = __dirname + '/public/comments.json';
var readJson = function (filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding, function(err, data) {
        if(err) {
            return console.log("error al leer json");
        }
    });
    return JSON.parse(file);
};

var writeJson = function(filepath, content, encoding) {
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }

    fs.writeFile(filepath, JSON.stringify(content), encoding, function(err, data) {
      if(err) {
          return console.log("error al guardar json");
      }
      console.log("json guardado: " + data);
   });
};

app.use(express.static(__dirname + '/public'));

app.get('/commentsfromjson', function (req, res){
		res.json(readJson(jsonPath));
});

app.post('/commentsfromjson', function (req, res) {
    var json = readJson(jsonPath) || [];
    console.log("json: " + json);

    json.push({author: req.body.author, text: req.body.text});
    writeJson(jsonPath, json);
    res.json(json);
});

app.listen(5000);
