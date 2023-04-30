var isLive = false;

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.twitch.tv/helix/streams?user_id=39664992',
  headers: { 
    'Client-Id': 'kgg81ytnzl7iphiz7417dzuets3sww', 
    'Authorization': 'Bearer 440z5xrww1adipiu4ukedqibnswlss'
  }
};


checkForTwitchOnline();

function checkForTwitchOnline(){
  var data;
  axios.request(config)
    .then((response) => {
    console.log(response.data);
    data = response.data;
  })
    .catch((error) => {
    console.log(error);
  });
  
  
  setTimeout(() => {
    checkForTwitchOnline();
  }, 150000);
}