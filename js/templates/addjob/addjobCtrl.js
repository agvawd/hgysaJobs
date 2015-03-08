angular.module("hgysaJobs").controller("addjobCtrl", function($scope, $location, mainService, env){
	var sync = mainService.getJobs();
	$scope.jobs = sync.$asArray();
	
	var created_at = new Date().toLocaleString();;
	
	var ref = new Firebase(env.getAppUrl());
	var authData = ref.getAuth();
	if(!authData) {
		$location.path("/login");
	}

	$scope.postJobData = function(jobObj) {
		jobObj.created_at = created_at;
		$scope.jobs.$add(jobObj);
		console.log("successfully uploaded!")
		$scope.job = '';
	}
})