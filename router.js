
const express = require('./node_modules/express');
const router = express.Router();
const app = express();
const config = require('./config/config');
const bodyParser = require('body-parser');


app.set('llave', config.llave);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => { res.send('server is up and running')});

module.exports = router;