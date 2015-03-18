angular.module("hgysaJobs").directive("navDir", function(env, $location, $rootScope, $localStorage, $sessionStorage){
	return {
		restrict: "E",
		templateUrl: "/js/directives/navbar/nav-dir.html",
		scope: {
			link: "="
		},
		link: function($scope, $elem, $attr){
			$scope.logOut = function(){
				var ref = new Firebase(env.getAppUrl());
				ref.unauth();
				$localStorage.admin = false;
			}
		}
	}
})