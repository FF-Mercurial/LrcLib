'use strict';

var DEFAULT_PORT = 5000;

var meta = require('../package.json'),
    path = require('path'),
    config = require('../config'),
    app = module.exports = require('express')(),
    port = parseInt(process.argv[2]);

app.set('name', meta.name);
app.set('version', meta.version);
app.set('port', port || DEFAULT_PORT);
app.set('root', path.resolve(__dirname, '..'));
app.set('logger', console);

app.enable('trust proxy');

var compress = require('compression'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    router = require('./router'),
    base = ['combo', 'proxy', 'static', 'error'];

base.forEach(function (m) {
  base[m] = require('./base/' + m);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compress());
app.use('/co', base.combo());
app.use(base.static());
app.use(base.error());

app.init = function (cb) {
  MongoClient.connect(config.mongoHost + '/LrcLib', (err, db) => {
    if (err) {
      cb(err)
    } else {
      app.use(router({ db: db }))
      cb()
    }
  })
}