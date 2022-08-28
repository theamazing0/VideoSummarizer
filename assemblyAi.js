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

//create a link from file
async function createLink(file) {
	console.log("processing upload");
	//read the file
	var data = file;
	/*const reader = new FileReader();
	var data;
	reader.onload = function(e) {
		data = e.target.result;
	}
	await reader.readAsArrayBuffer(file);*/
	//send post req
	return new Promise((resolve) => {
		assembly
			.post("/upload", data)
			.then((res) => resolve(res.data))
			.catch((err) => console.error(err));
	});
}

//queue transcription request
function queueAudio(url) {
	return new Promise(resolve => {
		assembly.post("/transcript", {
			audio_url: url
		})
			.then((res) => { resolve(res.data.id); })
			.catch((err) => console.error(err));
	});
}
//get the transcription result
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
						console.log("current status: " + res.data.status)
						if (res.data.status == "error")
							console.log(res.data)
					}
				})
				.catch((err) => console.error(err));
		}, 10000);

	});

}
//converts url into transcripted text
async function transcribeUrl(url) {
	var id = await queueAudio(url);
	console.log("Request sent with id: " + id)
	var t = await getTranscript(id)
	console.log(t)
	return t;
}

module.exports = {transcribeUrl}