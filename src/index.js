const express = require('express')
const path = require('path');
const app = express()
const port = 3000
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(`${path.join(__dirname)}/html/index.html`))
});
app.get('/add', (req, res) => {
  res.sendFile(path.join(`${path.join(__dirname)}/html/add.html`))
})
app.get('/easy', (req, res) => {
  res.sendFile(path.join(`${path.join(__dirname)}/html/easy.html`))
})
app.get('/fetchRandom', async (req, res) => {
  let thing = require('./js/fetchRandomVideo');
  let r = await thing.run(req, res);
  res.send(r)
})
app.post('/addVideo', async (req, res) => {
  let thing = require('./js/addVideo');
  let r = await thing.run(req, res);
  console.log(r)
  res.send(r)
});

app.use(express.static('./html/js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})