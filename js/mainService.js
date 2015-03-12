var app = angular.module("hgysaJobs");

app.factory("Auth", function($firebaseAuth, env){
  var firebaseUrl = env.getAppUrl();  
  var ref = new Firebase(firebaseUrl);
  console.log($firebaseAuth(ref));
  return $firebaseAuth(ref)
})

app.service("mainService", function($firebase, $location, env, $rootScope, $q){
  var firebaseUrl = env.getAppUrl();  
	this.getJobs = function() {
		return $firebase(new Firebase(firebaseUrl + "jobs"));
	}

	  this.addUser = function(email, password) {
      var deferred = $q.defer();
      var service = this;
      var ref = new Firebase(firebaseUrl);
      ref.createUser({
        email: email,
        password: password
      }, function(error, userData){
        debugger;
        if(error){
          console.log("Unable to create user")
          deferred.reject();          
        }
        else {
          console.log("successfully created user!");
          service.logUserIn(email, password).then(function(){
            deferred.resolve(userData);
          });
        }
      });
        return deferred.promise;
    }

    //log in
    this.logUserIn = function(email, password){
      var deferred = $q.defer();
      var ref = new Firebase(firebaseUrl);
      ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData){
        if(error) {
          console.log("Login Failed");
          deferred.reject();
        }
        else {
          console.log("Authentication successful!");
          deferred.resolve(authData);
        }
      },{remember: "sessionOnly" });
      return deferred.promise;
    }
})