angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env, $rootScope){
	var firebaseUrl = env.getAppUrl();

	$scope.logMeIn = function(existUser) {
		debugger;
		mainService.logUserIn(existUser.email, existUser.password)
		$scope.existUser = '';
	}

	$scope.addUser = function(newUser) {
		mainService.addUser(newUser.email, newUser.password);
		$scope.newUser = '';
	}

	$rootScope.$on("login", function(event){
		$location.path("/display");
	})
	$rootScope.$on("loginError", function(event){
		$location.path("/login");	
	})

})