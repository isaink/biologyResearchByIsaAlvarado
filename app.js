const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Getting Routes...
const researchers = require('./routes/researchers.js');
const species = require('./routes/species.js');
const animals = require('./routes/animals.js');
const habitats = require('./routes/habitat.js');
const taggings = require('./routes/taggings.js');
const sightings = require('./routes/sightings.js');

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
app.use('/habitats', habitats);
app.use('/taggings', taggings);
app.use('/sightings', sightings);

app.get('/', (req, res) => {
  res.send('This is the HOMEPAGE')
});

app.listen(2020, () => {
  console.log('App is listing to biologyresearch, on port 2020');
});
