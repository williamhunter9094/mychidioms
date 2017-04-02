const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(compression());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(__dirname + '/public'));

var heroes = [
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

app.get('/app/heroes', function(req, res) {
  var name = req.query.name;
  if (name) {
    name = name.toLowerCase();
    var results = _.filter(heroes, function(hero) {
      return _.includes(hero.name.toLowerCase(), name);
    });
    res.json(results);
  } else {
    res.json(heroes);
  }
});

app.post('/app/heroes', function(req, res) {
  var hero = req.body;
  if (typeof hero.name === "string") {
    var newId = 1;
    _.forEach(heroes, function(result) {
      newId = Math.max(newId, result.id);
    });
    res.json({ id: newId, name: hero.name });
  } else {
    res.sendStatus(400);
  }
});

app.put('/app/heroes/:id', function(req, res) {
  const heroId = +req.params.id;
  var hero = _.find(heroes, function(hero) { return hero.id === heroId; });
  if (hero) {
    hero.name = req.body.name;
    res.json(heroes);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/app/heroes/:id', function(req, res) {
  const heroId = +req.params.id;
  var hero = _.find(heroes, function(hero) { return hero.id === heroId; });
  if (hero) {
    for(var i = 0; i < heroes.length; i++) {
      var hero = heroes[i];
      if (hero.id === heroId) {
        heroes.splice(i, 1);
        break;
      }
    }
    res.json(heroes);
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