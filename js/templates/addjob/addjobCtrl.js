angular.module("hgysaJobs").controller("addjobCtrl", function($scope, $location, mainService, env, currentAuth){
	var sync = mainService.getJobs();
	$scope.jobs = sync.$asArray();
	
	var created_at = new Date().toLocaleDateString();;
	
	$scope.postJobData = function(jobObj) {
		if(!jobObj){
			$scope.incompleteInputAlert = true;
		}
		else if(!jobObj.name || !jobObj.companyName || !jobObj.location || !jobObj.description){
			$scope.incompleteInputAlert = true;
		}
		else {
			jobObj.created_at = created_at;
			$scope.jobs.$add(jobObj);
			$scope.job = '';
		}
	}

	$scope.dismissAlert = function(){
		$scope.incompleteInputAlert = false;
	}
})