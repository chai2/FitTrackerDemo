var api = {

  performAuth(username, password){
    console.log("I'm here");
    console.log(username);
    console.log('password: '+password);

    username = username.toLowerCase().trim();
    var url = `https://api.parse.com/1/login?username=`+username+`&password=`+password;


    // return
    //    Parse.User.logIn(this.username, this.password, {
    //   success: function(user) {
    //     console.log("I'm authing you");
    //     // Do stuff after successful login.
    //   },
    //   error: function(user, error) {
    //     console.log("I'm erroring you");
    //     // The login failed. Check error to see why.
    //   }
    // });
    return fetch(url, {
      method: 'get',
      headers: {
      'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
      'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ'
      }
    }).then((res) => res.json());
  }

};

module.exports = api;
