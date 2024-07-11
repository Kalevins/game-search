export function API(url) {
  return fetch(process.env.REACT_APP_OAUTHURL, { method: "POST" })
    .then(res => res.json())
    .then(json => {
      let init = {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+ json.access_token,
          "Client-Id": process.env.REACT_APP_CLIENTID
        }
      };
      return fetch(url, init)
        .then(res => res.json())
        .then(json => {
          return json;
        });
    });
};
