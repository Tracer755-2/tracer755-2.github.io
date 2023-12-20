function loadAllTracks(){
  axios.get(apiBase + "/api/get/tracks")
    .then(response => {
      let json = response.data;
      let container = document.getElementById("centerData");
      for(let i = 0; i < json.items.length; i++) {
        let obj = json.items[i];
        container.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
          <img src="http://172.172.79.84:3000/thumbnail/` + obj.id + `.jpg">
          <div class="card-body">
            <h6 class="card-title">` + obj.name + `</h6>
            <hr>
            <div>
              <a href="preview.html?` + obj.id + `"><button type="button" class="btn btn-primary">Preview</button></a>
              <button type="button" class="btn btn-success" onclick="copyLink('` + obj.id + `')">Copy</button>
            </div>
          </div>
        </div>
        `;
      }
    });
}

function copyLink(id){
  console.log("Writing to clipboard: " + apiBase + "/music/" + id + ".webm");
  navigator.clipboard.writeText(apiBase + "/music/" + id + ".webm");

  document.getElementById("alertarea").innerHTML = 
  `
  <div class="alert alert-dismissible alert-success" style="width: 25%">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <strong>Copied to clipboard</strong>
  </div>
  `;

}