angular.module("hgysaJobs").controller("displayCtrl", function($scope, mainService, $rootScope, $localStorage, $sessionStorage){
	var jobSync = mainService.getJobs();
	$scope.jobs = jobSync.$asArray();

	var userSync = mainService.getUsers();
	$scope.users = userSync.$asArray();

	$scope.admin = $localStorage.admin;

	$scope.changeUserType = function(user, type) {
		if(type === "normal"){
			user.type = "admin";
		}
		else {
			user.type = "normal"
		}
		$scope.users.$save(user);
	}

})