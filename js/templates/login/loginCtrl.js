angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env){
	var firebaseUrl = env.getAppUrl();

	$scope.logMeIn = function(existUser) {
		if($scope.existUser.email === undefined || $scope.existUser.password === undefined || $scope.existUser === undefined){
			$scope.logInAlert = true;
		}
		else {	
			mainService.logUserIn(existUser.email, existUser.password).then(function(currentAuth){
				console.log(currentAuth);
				if(currentAuth){
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}
			})
		}
			$scope.existUser = '';
	}



	$scope.addUser = function(newUser) {
		if($scope.newUser.email === undefined || $scope.newUser.password === undefined || $scope.newUser === undefined) {
			$scope.logInAlert = true;
		}
		else if ($scope.newUser.password !== $scope.conPass){
			$scope.newUserAlert = true;
		}
		else {
			mainService.addUser(newUser.email, newUser.password).then(function(currentAuth){
				if(currentAuth){
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}
			});
		}
			$scope.newUser = '';
			$scope.conPass = '';
	}

	$scope.forgotPass = function(email) {
		if($scope.email === '') {
			$scope.forgotPassAlert = true;
		}
		else {
			mainService.forgotPass(email);
		}
	}

	$scope.resetPassword = function(changePass) {
		if(!$scope.changePass.email || !$scope.changePass.oldPass || !$scope.changePass.newPass || !$scope.changePass) {
			//alert
		}
		// else if (){
		// 	//alert
		// }
		else {
			mainService.resetPass(changePass.email, changePass.oldPass, changePass.newPass);
		}
		$scope.changePass = '';
	}

	$scope.isClicked = function(){
		document.querySelector("#myCard").classList.toggle("flip");
	}

	$scope.signUp = false;
	$scope.forgotPass = false;
	$scope.resetPass = false;
	
	//---------Show-----------
	$scope.showSignUp = function() {
		$scope.signUp = true;
		$scope.isClicked();
	}

	$scope.showForgot = function(){
		$scope.forgotPass = true;
		$scope.isClicked();
	}

	$scope.showReset = function() {
		$scope.resetPass = true;
		$scope.isClicked();
	}

	//-----------Exit------------
	$scope.exitSignUp = function(){
		$scope.isClicked();
		$scope.signUp = false;
	}

	$scope.exitForgotPass = function(){
		$scope.isClicked();
		$scope.forgotPass = false;
	}

	$scope.exitResetPass = function() {
		$scope.isClicked();
		$scope.resetPass = false;
	}

	//-------Get rid of alerts--------
	$scope.dismissLogIn = function() {
		$scope.logInAlert = false;
	}

	$scope.dismissNewAlert = function() {
		$scope.newUserAlert = false;
	}

	$scope.dismissResetAlert = function() {
		$scope.forgotPassAlert = false;
	}
})