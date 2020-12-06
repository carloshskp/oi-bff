const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const LogMiddleware = require('./Middlewares/Log');
const PersonValidateMiddleware = require('./Middlewares/PersonValidate');
const RateLimiterMiddleware = require('./Middlewares/RateLimiter');
const PeopleController = require('./Controllers/People');
const UfController = require('./Controllers/Uf');

const dbUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`;
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

// Middlewares
app.use(LogMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/people', PeopleController.index);
app.get('/people/search', PeopleController.search);
app.post('/people', RateLimiterMiddleware, PersonValidateMiddleware, PeopleController.create);
app.get('/people/:id', PeopleController.person);
app.put('/people/:id', RateLimiterMiddleware, PersonValidateMiddleware, PeopleController.update);
app.delete('/people/:id', RateLimiterMiddleware, PeopleController.remove);

app.get('/uf', UfController.index);
app.get('/uf/:uf/cities', UfController.cities);

// App listen
app.listen(process.env.PORT || 8000, () => console.log(`Listenning on port: ${process.env.PORT || 8000}`));
