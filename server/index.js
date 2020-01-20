const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const path = require('path');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/products', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});