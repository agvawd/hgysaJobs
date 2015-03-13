angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env){
	var firebaseUrl = env.getAppUrl();

	$scope.logMeIn = function(existUser) {
		if($scope.existUser.email === undefined || $scope.existUser.password === undefined || $scope.existUser === undefined){
			$scope.logInAlert = true;
		}
		else {	
			mainService.logUserIn(existUser.email, existUser.password).then(function(currentAuth){
				console.log(currentAuth);
				if(currentAuth){
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}
			})
		}
			$scope.existUser = '';
	}

	$scope.addUser = function(newUser) {
		if($scope.newUser.email === undefined || $scope.newUser.password === undefined || $scope.newUser === undefined) {
			$scope.logUserIn = true;
		}
		else if ($scope.newUser.password !== $scope.conPass){
			$scope.newUserAlert = true;
		}
		else {
			mainService.addUser(newUser.email, newUser.password).then(function(currentAuth){
				if(currentAuth){
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}
			});
		}
			$scope.newUser = '';
			$scope.conPass = '';
	}
	
	$scope.isClicked = function(){
		document.querySelector("#myCard").classList.toggle("flip");
	}
})