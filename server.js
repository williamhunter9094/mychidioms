const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(compression());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + '/public'));

var chidioms = [
  {id: 11, name: 'Dead Rabbit'},
  {id: 12, name: 'Exemplar Teacher'},
  {id: 13, name: 'Break Axe'},
  {id: 14, name: 'Eight Immortals'},
  {id: 15, name: 'Garlic Skin'},
  {id: 16, name: 'Already-Know'},
  {id: 17, name: 'Yu Gong'},
  {id: 18, name: 'Hide Bushels'},
  {id: 19, name: 'Eatable Beauty'},
  {id: 20, name: 'Dragon Horse'},
];

app.get('/app/chidioms', function(req, res) {
  var name = req.query.name;
  if (name) {
    name = name.toLowerCase();
    var results = _.filter(chidioms, function(chidiom) {
      return _.includes(chidiom.name.toLowerCase(), name);
    });
    res.json(results);
  } else {
    res.json(chidioms);
  }
});

app.post('/app/chidioms', function(req, res) {
  var chidiom = req.body;
  if (typeof chidiom.name === "string") {
    var newId = 1;
    _.forEach(chidioms, function(result) {
      newId = Math.max(newId, result.id);
    });
    res.json({ id: newId, name: chidiom.name });
  } else {
    res.sendStatus(400);
  }
});

app.put('/app/chidioms/:id', function(req, res) {
  const chidiomId = +req.params.id;
  var chidiom = _.find(chidioms, function(chidiom) { return chidiom.id === chidiomId; });
  if (chidiom) {
    chidiom.name = req.body.name;
    res.json(chidioms);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/app/chidioms/:id', function(req, res) {
  const chidiomId = +req.params.id;
  var chidiom = _.find(chidioms, function(chidiom) { return chidiom.id === chidiomId; });
  if (chidiom) {
    for(var i = 0; i < chidioms.length; i++) {
      var chidiom = chidioms[i];
      if (chidiom.id === chidiomId) {
        chidioms.splice(i, 1);
        break;
      }
    }
    res.json(chidioms);
  } else {
    res.sendStatus(404);
  }
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/src/html/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});