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

function queueAudio(url) {
  return new Promise(resolve=>{
    assembly.post("/transcript", {
          audio_url: url
      })
      .then((res) => {resolve(res.data.id);})
      .catch((err) => console.error(err));
  });
}

function getTranscript(id) {
  return new Promise(resolve => {
    var n = setInterval(() => {
      assembly
      .get(`/transcript/${id}`)
      .then((res) => {
        if (res.data.status == "completed") {
          clearInterval(n);//stop checking
          resolve(res.data.text)
        }
      })
      .catch((err) => console.error(err));
    }, 10000);
    
  });
  
}

async function convertAssembly(url) {
  var id = await queueAudio(url);
  console.log("Request sent with id: " + id)
  var t = await getTranscript(id)
  console.log(t)
  return t;
}
//example pull
convertAssembly("https://bit.ly/3yxKEIY")

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

//asyncCall();
