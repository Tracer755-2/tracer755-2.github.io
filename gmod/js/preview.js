function loadPreview(){
  axios.get(apiBase + "/api/get/checkForFile?id=" + quickParam[0])
  .then(response => {
    if(response.data == true){
      //server had file
      axios.get(apiBase + "/api/get/track?id=" + quickParam[0])
        .then(response2 => {
          const box = document.getElementById("DataBox");
          box.innerHTML += `
          <h3 style="padding-bottom: 10px; max-width: 80%;">` + response2.data.name + `</h3>
          <img width="40%" src = "` + apiBase + `/thumbnail/` + response2.data.id + `.jpg">
          <br>
          <br>
          <div class="input-group mb-3" style="width: 38%">
            <input type="text" class="form-control" placeholder="` + apiBase + `/music/` + response2.data.id + `.webm" aria-label="Link" aria-describedby="button-addon2" readonly="">
            <button class="btn btn-primary" type="button" id="button-addon2" onclick="copyMusicLink()">Copy</button>
          </div>
          <br>
          <video controls width="250">
            <source src="` + apiBase + `/music/` + response2.data.id + `.webm" type="video/webm" />
          </video>
          `;
        });
      document.getElementById("recentLoading").remove();
    }
    else{
      //server did not have file
      console.log("Server did not have file");
      let errorArea = document.getElementById("alertarea");
      document.getElementById("recentLoading").remove();
      errorArea.innerHTML += `
      <div class="alert alert-dismissible alert-warning" style="max-width: 40%;">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Uh oh!</strong> The server does not appear to have this file
      </div>
      `;
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log("Could not connect to server");
    document.getElementById("recentLoading").remove();
    let errorArea = document.getElementById("alertarea");

    errorArea.innerHTML += `
    <div class="alert alert-dismissible alert-danger" style="max-width: 40%;">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>Oh snap!</strong> The server appears to be unreachable
    </div>
    `;
  });
}

function copyMusicLink(){
  console.log("Writing to clipboard: " + apiBase + "/music/" + quickParam[0] + ".webm");
  navigator.clipboard.writeText(apiBase + "/music/" + quickParam[0] + ".webm");

  document.getElementById("copytext").innerHTML = `
  <div class="alert alert-dismissible alert-success" style="width: 35%">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <strong>Copied to clipboard</strong>
  </div>
  `;
}