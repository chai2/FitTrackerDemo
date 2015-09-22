var React = require('react-native');
var shittyQs = require('shitty-qs');

var {
  LinkingIOS
} = React;

var oauth = {

  fitbitOauth (app_key, callback) {
    var state = Math.random() + ''

    LinkingIOS.addEventListener('url', handleUrl)

    function handleUrl (event) {
      var [, query_string] = event.url.match(/\#(.*)/)
      var query = shittyQs(query_string)
      if (state === query.state) {
        callback(null, query.access_token, query.uid)
      } else {
        callback(new Error('Oauth2 security error'))
      }
      LinkingIOS.removeEventListener('url', handleUrl)
    }

    LinkingIOS.openURL([
      'https://www.fitbit.com/oauth2/authorize',
      '?response_type=token',
      '&client_id=' + '229VKW',
      '&redirect_uri=leaderboard://authy',
      `&state=${state}`,
      '&scope=profile social weight activity location heartrate activity settings sleep',
      '&expires_in=2592000'
    ].join(''))
  }

};

module.exports = oauth;
