angular.module("hgysaJobs").service("mainService", function($firebase, $location, env, $rootScope){
	var firebaseUrl = env.getAppUrl();
	
	this.getJobs = function() {
		return $firebase(new Firebase(firebaseUrl + "jobs"));
	}

	  this.addUser = function(email, password) {
      var ref = new Firebase(firebaseUrl);
      ref.createUser({
        email: email,
        password: password
      }, function(error, userData){
        if(error){
          console.log(error)
          // $location.path("/login")
        }
        else {
          console.log(userData);
          // $location.path("/display")
        }
      })
    }

    //log in
    this.logUserIn = function(email, password){
      var ref = new Firebase(firebaseUrl);
      ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData){
        if(error) {
          console.log("Login Failed");
          $rootScope.$emit("loginError")
        }
        else {
          console.log("Authentication successful!");
          $rootScope.$emit("login")
        }
      });
    }
})