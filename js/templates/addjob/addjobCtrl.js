angular.module("hgysaJobs").controller("addjobCtrl", function($scope, $location, mainService, env, currentAuth, $sessionStorage){
	var sync = mainService.getJobs();
	$scope.jobs = sync.$asArray();
	
	$scope.postJobData = function(jobObj) {
		var created_at = new Date().toLocaleDateString();
		var name = $sessionStorage.currentLoggedInUser;
		if(!jobObj){
			$scope.incompleteInputAlert = true;
		}
		else if(!jobObj.companyName || !jobObj.location || !jobObj.description){
			$scope.incompleteInputAlert = true;
		}
		else {
			jobObj.name = name;
			jobObj.created_at = created_at;
			$scope.jobs.$add(jobObj);
			$scope.job = '';
		}
	}

	$scope.dismissAlert = function(){
		$scope.incompleteInputAlert = false;
	}
})