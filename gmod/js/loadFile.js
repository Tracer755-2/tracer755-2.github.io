let eta = 0;
let elapsed = 0;

function startFileLoad(){
  axios.get(apiBase + "/api/get/trackDataYT?id=" + quickParam[0])
    .then(response => {
      console.log(response.data);
      eta = response.data.duration / 13 + response.data.duration / 4.5;
      eta = Math.round(eta);
      console.log("Eta: " + secondsToHMS(eta));
      document.getElementById("DataBox").innerHTML += 
      `
        <h3 style="padding-bottom: 10px; max-width: 80%;">` + response.data.name + `</h3>
        <img width="50%" src = "https://img.youtube.com/vi/` + quickParam[0] + `/0.jpg">
        <br>
        <br>
        <h5 id="timetext" style="margin-left:45%;">ETA 00:00/` + secondsToHMS(eta) + `</h5>
        <div class="progress" style="width:60%">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progressBar" style=""></div>
        </div>
        <br>
      `;

      document.getElementById("recentLoading").remove();
      
      elapsed = -1;
      barCode();
      axios.get(apiBase + "/api/new/getVideo?id=" + quickParam[0])
      .then(response2 => {
        waitToLoadPreview();
      });
    });
}

function barCode(){
  if(eta > elapsed){
    elapsed++;
    document.getElementById("progressBar").style.width = ((elapsed / eta) * 100) + '%';
    document.getElementById("timetext").innerHTML = "ETA " + secondsToHMS(elapsed) + "/" + secondsToHMS(eta);
  }
  setTimeout(function() {
    barCode();
  }, 1000);
}

function waitToLoadPreview(){
  axios.get(apiBase + "/api/get/checkForFile?id=" + quickParam[0])
    .then(response => {
      console.log(response.data);
      if(response.data == true){
        window.location.href = "preview.html?" + quickParam[0];
      }
      else{
        setTimeout(function() {
          waitToLoadPreview();
        }, 100);
      }
    });
}