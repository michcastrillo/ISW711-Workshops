const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
const TeamModel = require("./models/team");
const PlayerModel = require("./models/player");
const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get('/teams', (req, res) => {
  TeamModel
    .find(function (err, teams) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(teams);
    });
  }
);


app.post('/teams/post', function (req, res) {

    const team = new TeamModel();
  
  
    team.name = req.body.name;
    team.description = req.body.description;
    if (team.name && team.description) {
      team.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the team', err);
          res.json({
            error: 'There was an error saving the team'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:3000/teams/?id=${team.id}`
        });
        res.json(team);
      });
    } else {
      res.status(422);
      console.log('error while saving the team')
      res.json({
        error: 'No valid data provided for team'
      });
    }
  });
app.patch('/teams/update/:id', (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    TeamModel
      .updateOne ({_id: id},{$set:{name, description}})
      .then ((data) => res.json(data))
      .catch ((error)=> res.json({message: error}));
});
app.delete('/teams/del/:id', (req, res) => {
  const {id} = req.params;
  TeamModel
    .remove ({_id: id})
    .then ((data) => res.json(data))
    .catch ((error)=> res.json({message: error}));
});

//////////////////////////////////////////////////////////
app.get('/player', (req, res) => {
  PlayerModel
    .find(function (err, players) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(players);
    });
  }
);
app.post('/player/post', function (req, res) {

    const player = new PlayerModel();
    //const teamMo = new TeamModel();
  
    player.first_name = req.body.first_name;
    player.last_name = req.body.last_name;
    player.age = req.body.age;
    player.team = req.body.team;
    if (player.first_name && player.last_name && player.age && player.team) {
        player.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the player', err);
          res.json({
            error: 'There was an error saving the player'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:3000/player/post/?id=${player.id}`
        });
        res.json(player);
      });
    } else {
      res.status(422);
      console.log('error while saving the player')
      res.json({
        error: 'No valid data provided for player'
      });
    }
  });
  app.patch('/player/update/:id', (req, res) => {
      const {id} = req.params;
      const {first_name, last_name, age, team} = req.body;
     PlayerModel
        .updateOne ({_id: id},{$set:{first_name, last_name, age, team}})
        .then ((data) => res.json(data))
        .catch ((error)=> res.json({message: error}));
  });
  app.delete('/player/del/:id', (req, res) => {
    const {id} = req.params;
    PlayerModel
      .remove ({_id: id})
      .then ((data) => res.json(data))
      .catch ((error)=> res.json({message: error}));
  });
  
app.listen(3000, () => console.log(`Fifa app listening on port 3000!`));


