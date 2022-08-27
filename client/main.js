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
    $("#open-show-transcript").click(function() {
        console.log("got here")
        // Hide Start Card
        $("#select-video-card").addClass("hidden");
        $("#select-video-card").removeClass("grid");
        // Show Select-video Card
        $("#show-transcript-card").addClass("grid");
        $("#show-transcript-card").removeClass("hidden");
	});
});
// //////////////////
// fetch("/trans", {
//   method: "POST",  
//   headers: {

//   },
//   body: JSON.stringify()
// }).then((res)=>res.text())
// .then((data) => {




// //////////////////
// fetch("/trans", {
//   method: "POST",  
//   headers: {

//   },
//   body: JSON.stringify()
// }).then((res)=>res.text())
// .then((data) => {



// })

//})