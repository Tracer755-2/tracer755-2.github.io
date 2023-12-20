

function showStorageUsage(){
  axios.get(apiBase + "/api/data/usedStorage")
    .then(response => {
      let mb = response.data.size / 1048576;
      let gb = mb / 1024;

      if(gb > 1){
        document.getElementById("storageText").innerHTML = Math.round(gb * 100) / 100 + "MB / 10GB"
      }
      else{
        document.getElementById("storageText").innerHTML = Math.round(mb * 100) / 100 + "MB / 10GB"
      }

      document.getElementById("progressBar").style.width = gb / 10 + '%';
    });
}