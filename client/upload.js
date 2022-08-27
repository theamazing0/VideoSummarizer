//Assembly API

$.ajax({
  type: "POST",
  url: "https://api.assemblyai.com/v2",
  data: data,
  success: ()=>{console.log("yay")},
  headers: {
        authorization: env["assembly"],
        "content-type": "application/json",
    }
});