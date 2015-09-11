var api = {

  performAuth(username, password){

    username = username.toLowerCase().trim();
    var url = `https://api.parse.com/1/login?username=`+username+`&password=`+password;
    return fetch(url, {
      method: 'get',
      headers: {
      'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
      'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ'
      }
    }).then((res) => res.json());
  },

  fetchFriendsInfo(state,access_token) {
    console.log("friends"+access_token);

    fetch(
      'https://api.fitbit.com/1/user/-/profile.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json());
  },

  fetchUserInfo(state,access_token) {

    fetch(
      'https://api.fitbit.com/1/user/-/user.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json())
  }

};

module.exports = api;
