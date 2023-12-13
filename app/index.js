const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const redis = require('redis');

const app = express()

app.use(cors());
app.use(express.static('src'));
app.use(express.json());
app.use(morgan('dev'));

const PORT = 8000;

const client = redis.createClient();
client.connect();
client.on("error", (err) => console.log('Redis client error', err));

app.get("/:key", async (req, res) => {
  const { key } = req.params;
  const value = await client.get(key);
  res.status(200).json({ message: value })
});

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  await client.set(key, value);
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});