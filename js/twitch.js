var isLive = false;


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.twitch.tv/helix/streams?user_id=570427215',
  headers: { 
    'Client-ID': 'kgg81ytnzl7iphiz7417dzuets3sww', 
    'Authorization': 'Bearer 440z5xrww1adipiu4ukedqibnswlss'
  }
};
checkForLiveTwitch();

function checkForLiveTwitch(){
  axios.request(config)
  .then((response) => {
    console.log(response.data);
    
  })
  .catch((error) => {
    console.log(error);
  });
}