angular.module("hgysaJobs").controller("displayCtrl", function($scope, mainService, $rootScope, $localStorage, $sessionStorage){
	var jobSync = mainService.getJobs();
	$scope.jobs = jobSync.$asArray();

	var userSync = mainService.getUsers();
	$scope.users = userSync.$asArray();

	$scope.admin = $localStorage.admin;

	debugger;
	if($scope.admin){
		$("entries").removeClass("scroll").addClass("adminScroll");
	}
	else {
		$("entries").removeClass("adminScroll").addClass("scroll");
	}
})