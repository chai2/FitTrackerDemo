var api = {

  performAuth(username, password){
    username = username.toLowerCase().trim();
    var url = `https://api.parse.com/1/login?username=`+username+`&password=`+password;
    console.log("URL in Login: ", url);
    return fetch(url, {
      method: 'get',
      headers: {
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Revocable-Session': '1'
      }
    }).then((res) => res.json());
  },

  performSignup(username, password, email){

    console.log("username"+username+"password"+password+"email"+email);

    username = username.toLowerCase().trim();
    var url = `https://api.parse.com/1/users?username=`+username+`&password=`+password+`&email=`+email;

    console.log("URL: ", url);

    return fetch(url, {
      method: 'POST',
      headers: {
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Revocable-Session': '1'
      }
    }).then((res) => res.json());
  },

  setCurrentUser(access_token){
    var url = `https://api.parse.com/1/users/me`
    return fetch(url, {
      method: 'get',
      headers: {
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Session-Token': `${access_token}`
      }
    })
  },

  fetchFriendsInfo(state,access_token) {
    var url = 'https://api.fitbit.com/1/user/-/friends.json';

    return fetch( url,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json());
  },

  fetchBadgesInfo(state,access_token) {
    var url = 'https://api.fitbit.com/1/user/-/badges.json';

    return fetch( url,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json());
  },

  fetchInvitationInfo(state, access_token) {
    var url = 'https://api.fitbit.com/1/user/-/friends/invitations.json';
    return fetch( url,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json());
  },

  fetchUserInfo(state,access_token) {

    var url = 'https://api.fitbit.com/1/user/-/profile.json';

    return fetch( url,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json())
  },

  fetchUserActivityStepsInfo(state, access_token) {
    var today = new Date();
    var date = today.toISOString().substring(0, 10);
    var url = 'https://api.fitbit.com/1/user/-/activities/date/'+date+'.json'
    return fetch( url,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }).then((res) => res.json());
  }

};

module.exports = api;
