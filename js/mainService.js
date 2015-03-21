var app = angular.module("hgysaJobs");

app.factory("Auth", function($firebaseAuth, env){
  var firebaseUrl = env.getAppUrl();  
  var ref = new Firebase(firebaseUrl);
  return $firebaseAuth(ref)
})

app.service("mainService", function($firebase, $location, env, $rootScope, $q){
  var firebaseUrl = env.getAppUrl();  
	this.getJobs = function() {
		return $firebase(new Firebase(firebaseUrl + "jobs"));
	}

  this.getUsers = function(){
    return $firebase(new Firebase(firebaseUrl + "users"));
  }

	  this.addUser = function(email, password) {
      var deferred = $q.defer();
      var service = this;
      var ref = new Firebase(firebaseUrl);
      ref.createUser({
        email: email,
        password: password
      }, function(error, userData){
        if(error){
          console.log("Unable to create user")
          deferred.reject(error);
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

    this.forgotPass = function(email){
      var deferred = $q.defer();
      var ref = new Firebase(firebaseUrl);
      ref.resetPassword({
        email : email
      }, function(error) {
        debugger;
        if (error === null) {
          console.log("Password reset email sent successfully");
          deferred.resolve();
        } else {
          console.log("Error sending password reset email:");
          deferred.reject(error);
        }
      });
      return deferred.promise;
    }

    this.resetPass = function(email, oldPassword, newPassword) {
      var deferred = $q.defer();
      var ref = new Firebase(firebaseUrl);
      ref.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(error) {
        if (error) {
          switch (error.code) {
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              deferred.reject(error);
              break;
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              deferred.reject(error);
              break;
            default:
              console.log("Error changing password");
          }
        } else {
          console.log("User password changed successfully!");
        }
      });
      return deferred.promise;
    }
})