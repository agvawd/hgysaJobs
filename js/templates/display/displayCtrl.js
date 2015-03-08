angular.module("hgysaJobs").controller("displayCtrl", function($scope, mainService){
	var sync = mainService.getJobs();
	$scope.jobs = sync.$asArray();
	console.log($scope.jobs);
})