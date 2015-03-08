var app = angular.module("hgysaJobs", ["firebase", "ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
	.when("/login", {
		templateUrl: "/js/templates/login/login.html",
		controller: "loginCtrl"
	})
	.when("/login/admin", {
		templateUrl: "/js/templates/admin/admin.html",
		controller: "adminCtrl"
	})
	.when("/addjob", {
		templateUrl: "/js/templates/addjob/addjob.html",
		controller: "addjobCtrl"
	})
	.when("/display", {
		templateUrl: "/js/templates/display/display.html",
		controller: "displayCtrl"
	})
	.otherwise({
		redirectTo: "/display"
	})
})