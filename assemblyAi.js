const axios = require("axios");
const secrets = require("./secrets.js");

//assembly AI
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: secrets.assemblyAiKey,
        "content-type": "application/json",
    },
});

//fetch
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
        } else {
          console.log("current status: "+res.data.status)
        }
      })
      .catch((err) => console.error(err));
    }, 10000);
    
  });
  
}

async function convertUrl(url) {
  var id = await queueAudio(url);
  console.log("Request sent with id: " + id)
  var t = await getTranscript(id)
  console.log(t)
  return t;
}
//example pull
//https://www.youtube.com/watch?v=EqviBPG2uPE
//https://bit.ly/3yxKEIY
//convertAssembly("https://www.youtube.com/watch?v=EqviBPG2uPE")
module.exports = {convertUrl}