angular.module("hgysaJobs").controller("displayCtrl", function($scope, mainService, $localStorage, $timeout){
	var jobSync = mainService.getJobs();
	$scope.jobs = jobSync.$asArray();

	var userSync = mainService.getUsers();
	$scope.users = userSync.$asArray();

	$scope.admin = $localStorage.admin;

	var numOfAdmins = function(){
		$scope.users.$loaded().then(function(array){
			$scope.count = 0;
			for(var i = 0; i < array.length; i++){
				if(array[i].type === "admin"){
					$scope.count++;
				}
			}
		})
	}

	numOfAdmins();

	$scope.changeUserType = function(user, type) {
		if(type === "normal"){
			user.type = "admin";
		}
		else {
			if($scope.count === 1){
			console.log("Cannot change user type.  Last admin")
			}
			else {
				user.type = "normal"
			}
		}
		numOfAdmins();
		$scope.users.$save(user);
	}

	$scope.deleteJob = function(job){
		$scope.jobs.$remove(job);
	}
})