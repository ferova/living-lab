const mongoose = require('mongoose');
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const { Logger } = require('./utils/Logger');
const settings = require('./config/Settings');
const api = require('./routes/Api')
const resHandler = require('./utils/ResHandler')
const cors = require("cors");

const app = express();

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