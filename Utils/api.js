var api = {

  performAuth(username, password){

    username = username.toLowerCase().trim();
    var url = `https://api.parse.com/1/login?username=`+username+`&password=`+password;
    return fetch(url, {
      method: 'get',
      headers: {
      'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
      'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ',
      'X-Parse-Revocable-Session': '1'
      }
    }).then((res) => res.json());
  },

  setCurrentUser(access_token){
    var url = `https://api.parse.com/1/users/me`
    return fetch(url, {
      method: 'get',
      headers: {
      'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
      'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ',
      'X-Parse-Session-Token': `${access_token}`
      }
    })
  },

  fetchFriendsInfo(state,access_token) {
    return fetch(
      'https://api.fitbit.com/1/user/-/friends.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json());
  },

  fetchBadgesInfo(state,access_token) {
    console.log("friends: hero"+access_token);

    return fetch(
      'https://api.fitbit.com/1/user/-/friends.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json())
  },

  fetchUserInfo(state,access_token) {

    return fetch(
      'https://api.fitbit.com/1/user/-/profile.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }
    ).then((res) => res.json())
  },

  fetchUserActivityInfo(state, date, access_token) {
    var url = 'https://api.fitbit.com/1/user/-/activities/date/${date}.json';
    return fetch( url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && access_token}`
        }
      }).then((res) => res.json())
  },

  fetchGoalsInfo(state, access_token) {
    var url = 'https://api.fitbit.com/1/user/-/activities/goals/daily.json';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${state && access_token}`
      }
    }).then((res) => res.json())
  }

};

module.exports = api;
