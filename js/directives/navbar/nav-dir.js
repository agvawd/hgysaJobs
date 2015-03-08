angular.module("hgysaJobs").directive("navDir", function(env, $location){
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
			}
		}
	}
})