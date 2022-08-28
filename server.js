const express = require('express');
//const secrets = require("./secrets.js");
//const assemblyAi = require("./assemblyAi.js")
const bp = require("body-parser")

const app = express();

var assemblyAiKey = process.env["assembly"]

// Send Web3
app.use(express.static("./client"));
app.use(bp.json({limit: '50mb', extended: true}))
app.use(bp.urlencoded({limit: '50mb', extended: true }))

// REST APIs
app.get('/key', async(req, res) => {
  res.send({key: assemblyAiKey});
});

// 
app.listen(3000, () => {
  console.log('server started');

});

//assemblyAi.convertUrl("https://www.youtube.com/watch?v=EqviBPG2uPE")