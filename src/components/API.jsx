
const clientId = "13547gpmi78e4mytmz75qzu5don0un";
const clientSecret = "corf9rn6dzxjkuhlaoos6du4kdbbzu";
const oauthUrl = "https://id.twitch.tv/oauth2/token?client_id="+clientId+"&client_secret="+clientSecret+"&grant_type=client_credentials";

export function API(url) {
  return fetch(oauthUrl, { method: "POST" })
    .then(res => res.json())
    .then(json => {
      //console.log(json);
      let init = {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+ json.access_token,
          "Client-Id": clientId
        }
      };
      return fetch(url, init)
        .then(res => res.json())
        .then(json => {
          //console.log(json);
          return json;
        });    
    });   
};

    
