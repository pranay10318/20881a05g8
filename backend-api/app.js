/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //for parsing from/to json
var cookieParser = require("cookie-parser");
const path = require("path");
const { getElementById } = require("domutils");
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })); //for encoding urls  form submission for maniputlating election
app.set("view engine", "ejs"); //setting up engine to work with ejs
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", async (request, response) => {
  return response.render("index", {
    title: "Train Schedules",
  });
});
app.get('/trains', async (req, res) => {
  try {
    const data = {
      "companyName": "Pranay Private Limited..",
      "clientID": "61d96488-b34a-46c2-87d1-b6da51f5e1e1",
      "clientSecret": "koZCuTuRpLKzzuuF",
      "ownerName": "Pranay",
      "ownerEmail": "pranayradharapu1@gmail.com",
      "rollNo": "20881A05g8"
    };

    const authResponse = await fetch('http://104.211.219.98/train/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!authResponse.ok) {
      throw new Error('Authorization request failed with status ' + authResponse.status);
    }

    const authData = await authResponse.json();
    const trainsResponse = await fetch('http://104.211.219.98/train/trains', {
      method: 'GET',
      headers: {
        'Authorization': `${authData.token_type} ${authData.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!trainsResponse.ok) {
      throw new Error('Get trains request failed with status ' + trainsResponse.status);
    }

    const trainsData = await trainsResponse.json();
    // console.log("traisn data" + trainsData);
    res.json(trainsData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/train/:tid', async (req, res) => {
  try {
    const data = {
      "companyName": "Pranay Private Limited..",
      "clientID": "61d96488-b34a-46c2-87d1-b6da51f5e1e1",
      "clientSecret": "koZCuTuRpLKzzuuF",
      "ownerName": "Pranay",
      "ownerEmail": "pranayradharapu1@gmail.com",
      "rollNo": "20881A05g8"
    };

    const authResponse = await fetch('http://104.211.219.98/train/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const authData = await authResponse.json();

    const tid = req.params.tid;

    const url = `http://104.211.219.98/train/trains/${tid}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${authData.token_type} ${authData.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    const trainDetails = await response.json();

    // console.log(trainDetails);

    res.json(trainDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = app;
