require('dotenv').config();
const axios = require('axios');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

console.log('KEY', process.env.CURRENTS_API_KEY)
const { CURRENTS_API_KEY = '' } = process.env;
// server.get('/', (req, res) => {
//   res.send({message: 'hello'})
// })
server.use(express.static('public'));

server.get('/news', async (req, res) => {
  try {
    const {data} = await axios.get(`https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${CURRENTS_API_KEY}`);
    console.log('>>>>>>>>> data', data);
    
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({error})
  }
})

server.use(morgan('dev'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

const { PORT = 3030 } = process.env;

server.listen(PORT, () => {
  console.log('Oh my, we are listening!');
});
