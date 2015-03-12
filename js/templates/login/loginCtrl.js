angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env){
	var firebaseUrl = env.getAppUrl();

	$scope.logMeIn = function(existUser) {
		mainService.logUserIn(existUser.email, existUser.password).then(function(currentAuth){
			console.log(currentAuth);
			if(currentAuth){
				$location.path("/addjob")
			}
			else{
				$location.path("/login")
			}
		})
		$scope.existUser = '';
	}

	$scope.addUser = function(newUser) {
		debugger;
		mainService.addUser(newUser.email, newUser.password).then(function(currentAuth){
			console.log("hit")
			if(currentAuth){
				$location.path("/addjob")
			}
			else{
				$location.path("/login")
			}
		});
		$scope.newUser = '';
	}
})