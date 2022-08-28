
$(document).ready(function() {
	// Open Select-video
	$("#open-select-video").click(function() {
		// Hide Start Card
		$("#start-card").addClass("hidden");
		$("#start-card").removeClass("grid");
		// Show Select-video Card
		$("#select-video-card").addClass("grid");
		$("#select-video-card").removeClass("hidden");
	});
	// Open Show Transcript
	$("#open-show-transcript").click(async function() {
		$("#open-show-transcript").html('<i class="bi bi-cloud-upload"></i>  Uploading');
		$("#open-show-transcript").addClass("animate-pulse");
		$("#fileInputBox").prop('disabled', true);

		//pull input box contents
		var input = document.getElementById("fileInputBox");
		// Start Sending Video File
		//get the files
		const file = $('#fileInputBox').prop('files')[0];
		var link = await createLink(file);
		console.log(link)
		var transcript = await transcribeUrl(link["upload_url"], true);
		console.log(transcript)

		// Display Transcript In View
		$("#summarizationView").text(transcript);

		// Hide Select Card
		$("#select-video-card").addClass("hidden");
		$("#select-video-card").removeClass("grid");
		// Show transcript Card
		$("#show-transcript-card").addClass("grid");
		$("#show-transcript-card").removeClass("hidden");

	});
	// React To File Selected
	$("#fileInputBox").change(function(e) {
		var filename = e.target.files[0].name;
		console.log(filename)
		$("#fileSelectedDisplay").text(filename);
		//file reader thru alternative method
		/*const reader = new FileReader();
		reader.addEventListener('load', async(event) => {
		  console.log("load handler")
		  const file = event.target.result;
				//do uploading stuff
				var link = await createLink(file);
				console.log(link)
				var text = await transcribeUrl(link["upload_url"]);
				console.log(text)
		});
		reader.readAsArrayBuffer(event.target.files[0]);*/
	});
	$("$lets-do-again").click( function() {
		// Hide transcript Card
		$("#show-transcript-card").addClass("hidden");
		$("#show-transcript-card").removeClass("grid");
		// Show start Card
		$("#start-card").addClass("grid");
		$("#start-card").removeClass("hidden");
		// unlock file box
		$("#fileInputBox").prop('disabled', false);
	});

});

//connect w/ backend

//API key
var assembly;
axios.get("/key").then((res)=>{
  assembly = axios.create({
  	baseURL: "https://api.assemblyai.com/v2",
  	headers: {
  		authorization: res.data.key,
  		"content-type": "application/json",
  		//"transfer-encoding": "chunked",
  	}
});
})

//All Assembly AI things
//initiate axios

//create a link from file
async function createLink(file) {
	console.log("processing upload");
	//read the file
	var data = file;
	//send post req
	return new Promise((resolve) => {
		assembly
			.post("/upload", data)
			.then((res) => resolve(res.data))
			.catch((err) => console.error(err));
	});
}

//queue transcription request
function queueAudio(url, summary) {
	return new Promise(resolve => {
		assembly.post("/transcript", {
			audio_url: url,
      auto_chapters: summary || false      
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
async function transcribeUrl(url, summary) {
	var id = await queueAudio(url, summary);
	console.log("Request sent with id: " + id)
	var t = await getTranscript(id)
	console.log(t)
	return t;
}