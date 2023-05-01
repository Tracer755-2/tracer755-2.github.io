var isLive = false;


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.twitch.tv/helix/streams?user_id=83922632',
  headers: { 
    'Client-ID': 'kgg81ytnzl7iphiz7417dzuets3sww', 
    'Authorization': 'Bearer 440z5xrww1adipiu4ukedqibnswlss'
  }
};
  setTimeout(() => {
    checkForLiveTwitch();
  }, 500);

function checkForLiveTwitch(){
  axios.request(config)
  .then((response) => {
    console.log(response.data);
    if(response.data.data.length > 0){
      //user has a stream running  
      refreshTwitchBox(true);
      document.getElementById("twitchTitle").innerHTML = response.data.data[0].title;
      document.getElementById("twitchGameName").innerHTML = response.data.data[0].game_name;
      document.getElementById("twitchGameIcon").src = "https://static-cdn.jtvnw.net/ttv-boxart/" +response.data.data[0].game_id + "_IGDB-144x192.jpg";
    }
    else{
      //user does not have a stream
      refreshTwitchBox(false);
    }
    
  })
  .catch((error) => {
    console.log(error);
  });
  
  setTimeout(() => {
    checkForLiveTwitch();
  }, 15000);
}
//twitch game cover
//https://static-cdn.jtvnw.net/ttv-boxart/[Game ID]_IGDB-144x192.jpg

function refreshTwitchBox(currentState){
  var lastState = isLive;
  isLive = currentState;
  var twitch = document.getElementById("twitchBox");
  
  if(lastState == false && currentState == true){
    twitch.classList.remove("twitchContentClose");
    twitch.classList.add("twitchContentOpen");
  }
  if(lastState == true && currentState == false){
    twitch.classList.remove("twitchContentOpen");
    twitch.classList.add("twitchContentClose");
  }
}