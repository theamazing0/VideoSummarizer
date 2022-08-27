const express = require('express');
const secrets = require("./secrets.js");
const axios = require("axios");


const app = express();

var assemblyAiKey = secrets.assemblyAiKey

// Send Web3
app.use(express.static("./client"));

// REST APIs
app.post('/datablahblah', (req, res) => {
	var data = res.body.data;
  return res.send('GET HTTP method on user resource');
});

// 
app.listen(3000, () => {
  console.log('server started');
});

//assembly AI
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: secrets.assemblyAiKey,
        "content-type": "application/json",
    },
});
function queueAudio(url)
  assembly.post("/transcript", {
          audio_url: url
      })
      .then((res) => {return res.data.id;})
      .catch((err) => console.error(err));
}

async function getAudio(id) {
  assembly
    .get(`/transcript/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}

var a = queueAudio("https://bit.ly/3yxKEIY");
setInterval(()=>{

  
}, 10000)