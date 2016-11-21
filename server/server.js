// ini adalah library node
// fs untuk membaca file (.json)
var fs = require('fs');
// path untuk membetulkan path program
var path = require('path');
// express adalah framework node js
var express = require('express');
// bodyParser untuk mengirimkan sebuah nilai yg dirikim didalam form
var bodyParser = require('body-parser');
var app = express();

var DATA_FILE = path.join(__dirname, 'data/data.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/', function(req, res){
  res.send("REKY CHAT APP API");
});

app.get('/api/data', function(req, res){
  fs.readFile(DATA_FILE, function(err, data){
    if(err){
      console.error(err);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/data', function(req, res){
  fs.readFile(DATA_FILE, function(err, data){
    console.log(req);
    if(err){
      console.error(err);
    }
    var data = JSON.parse(data);
    var item = {
      id: req.body.id,
      name: req.body.name,
      comment: req.body.comment
    };
    data.push(item);
    fs.writeFile(DATA_FILE, JSON.stringify(data, null, 3), function(err){
      if(err){
        console.error(err);
      }
      res.json(item);
    });
  });
});

app.post('/api/data/edit', function(req, res){
  fs.readFile(DATA_FILE, function(err, data){
    var data = JSON.parse(data);
    var idObject = data.map(function (x) {
      return x.id;
    }).indexOf(req.body.id);
    console.log(idObject);
    if (idObject > -1) {
      data[idObject].comment = req.body.comment
      fs.writeFile(DATA_FILE, JSON.stringify(data, null, 3), function(err){
        if(err){
          console.error(err);
        }
        res.json(data);
      });
    } else {
      console.error("data not found");
    }
  });
});

app.post('/api/data/delete', function(req, res){
  fs.readFile(DATA_FILE, function(err, data){
    var data = JSON.parse(data);
    var idObject = data.map(function (x) {
      return x.id;
    }).indexOf(req.body.id);
    console.log(idObject);
    if (idObject > -1) {
      data.splice(idObject, 1);
      fs.writeFile(DATA_FILE, JSON.stringify(data, null, 3), function(err){
        if(err){
          console.error(err);
        }
        res.json(data);
      });
    } else {
      console.error("data not found");
    }
  });
});

app.listen(3333, function(){
  console.log('Server jalan om');
})
