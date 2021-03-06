var app = angular.module("hgysaJobs");

app.factory("Auth", function($firebaseAuth, env){
  var firebaseUrl = env.getAppUrl();  
  var ref = new Firebase(firebaseUrl);
  return $firebaseAuth(ref)
})

app.service("mainService", function($firebase, $location, env, $q){
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
          deferred.reject(error.code);
        }
        else {
          console.log("successfully created user!");
          service.logUserIn(email, password).then(function(success){
            deferred.resolve(success);
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
          deferred.reject(error.code);
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
        if (error === null) {
          console.log("Password reset email sent successfully");
          deferred.resolve();
        } else {
          console.log("Error sending password reset email:");
          deferred.reject(error.code);
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
              deferred.reject(error.code);
              break;
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              deferred.reject(error.code);
              break;
            default:
              console.log("Error changing password");
              deferred.reject(error.code);
          }
        } else {
          console.log("User password changed successfully!");
          deferred.resolve();
        }
      });
      return deferred.promise;
    }
})