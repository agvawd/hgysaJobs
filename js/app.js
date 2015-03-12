var app = angular.module("hgysaJobs", ["firebase", "ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
	.when("/login", {
		templateUrl: "/js/templates/login/login.html",
		controller: "loginCtrl",
	})
	.when("/login/admin", {
		templateUrl: "/js/templates/admin/admin.html",
		controller: "adminCtrl"
	})
	.when("/addjob", {
		templateUrl: "/js/templates/addjob/addjob.html",
		controller: "addjobCtrl",
		resolve: {
			currentAuth: function(Auth){
				return Auth.$requireAuth();
			}
		}
	})
	.when("/display", {
		templateUrl: "/js/templates/display/display.html",
		controller: "displayCtrl"
	})
	.otherwise({
		redirectTo: "/display"
	})
})

app.run(["$rootScope", "$location", function($rootScope, $location){
	$rootScope.$on("$routeChangeError", function(event, next, previous, error){
		console.log(next.$$route.originalPath)
		if(error === "AUTH_REQUIRED") {
			$location.path("/login")
		}
	})
}])