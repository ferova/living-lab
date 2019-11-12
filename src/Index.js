const mongoose = require('mongoose');
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const { Logger } = require('./utils/Logger');
const settings = require('./config/Settings');
const api = require('./routes/Api')
const resHandler = require('./utils/ResHandler')
const cors = require("cors");
const { retrieveData, putData } = require('./controllers/sensorData');

const app = express();

const mqtt = require('mqtt');
const  url = require('url');

// Parse
const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
const auth = (mqtt_url.auth || ':').split(':');

var client = mqtt.connect(mqtt_url);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('weatherstation/10009/data', function() {
    // when a message arrives, do something with it
    client.on('message', putData);
    });
  });


app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(settings.MONGO_URI,{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api)
app.get('*', (req, res, next) => {
  res.redirect('/')
})
app.use(resHandler.success)
app.use(resHandler.error)

const port = settings.PORT || 3000;

app.listen(port, () => {
  Logger.info(`Server running on port: ${port}`);
});

module.exports = app;