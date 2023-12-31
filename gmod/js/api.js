const apiBase = "https://gmod-api.tracer755.com";
let quickParam = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

document.body.innerHTML += `<center><hr style="width:60%; margin-bottom:6px;"><h6 style="padding-bottom:10px;">Made with &hearts; by Wicker</h6></center>`;

function PollAPI(){
  axios.get(apiBase)
    .then(response => {
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("Could not connect to server");

      let errorArea = document.getElementById("alertarea");

      errorArea.innerHTML += `
      <div class="alert alert-dismissible alert-danger" style="max-width: 40%;">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Oh snap!</strong> The server appears to be unreachable
      </div>
      `;
    });
}

function LoadHomePage(){
  axios.get(apiBase + "/api/get/tracks?num=6")
    .then(response => {
      const json = response.data;
      if(json.items.length == 0){
        document.getElementById("recentVideoBox").innerHTML += `<h4 style="padding-left:15px;">No Files</h4>`
      }
      else{
        for(let i = 0; i < json.items.length; i++) {
          let obj = json.items[i];
      
          const htmlData = `
          <br>
          <div class="alert-dismissible alert-primary" style="display: flex; align-items: center; padding: 6px;">
            <img width="75vw" src="` + apiBase + `/thumbnail/` + obj.id + `.jpg" style="margin-right: 10px;">
            <div style="max-width: 70%;">
              <h4 style="margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">` + obj.name + `</h4>
              <h5>` + secondsToHMS(obj.duration) + `</h5>
            </div>
            <a href="preview.html?` + obj.id + `" style="margin-left: auto; margin-right: 10px;"><img src="content/img/open-file.png" width="25" height="25" style="margin-left: auto; margin-right: 10px;"></a>
          </div>`;
          document.getElementById("recentVideoBox").innerHTML += htmlData;
        }
      }
      document.getElementById("recentLoading").remove();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("Could not load ");

      let recentLoading = document.getElementById("recentLoading");

      recentLoading.innerHTML = `
      <div class="alert alert-dismissible alert-danger" style="max-width: 40%;">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Oh snap!</strong> Could not load recent audio files
      </div>
      `;
    });
}

function secondsToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Use a function to add leading zeros
  const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

  // Format the output
  let formattedTime = '';

  if (hours > 0) {
    formattedTime += addLeadingZero(hours) + ':';
  }

  formattedTime += addLeadingZero(minutes) + ':' + addLeadingZero(remainingSeconds);

  return formattedTime;
}

function getVideo(){
  let input = document.getElementById('Youtube-link-input').value;
  let id = input.split("v=")[input.split("v=").length - 1].split("&")[0];
  if(!id.includes(".com") && input.includes("www.youtube.com")){
    console.log(id);
    window.location.href = "loadFile.html?" + id;
  }
  else{
    let errorArea = document.getElementById("alertarea");

    errorArea.innerHTML += `
    <div class="alert alert-dismissible alert-danger" style="max-width: 40%;">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>Whoops!</strong> Sorry but thats not a valid link
    </div>
    `;
  }
}