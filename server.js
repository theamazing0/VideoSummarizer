const express = require('express');
const fetch = require("node-fetch")


const app = express();

// Send Web3
app.use(express.static("./client"));

// REST APIs


app.listen(3000, () => {
  console.log('server started');
});


fetch("api link",{
  method:"POST",
  headers:{
    "api-key":"secrit numbar",
    //"Content-Type":"application/json"
  },
  body:"data stuff"
}).then(res => res.json())
.then(data =>console.log(data))