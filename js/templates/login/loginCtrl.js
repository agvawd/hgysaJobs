angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env, $timeout, $rootScope, $localStorage, $sessionStorage){
	var firebaseUrl = env.getAppUrl();

	$scope.signUp = false;
	$scope.forgotPass = false;
	$scope.resetPass = false;

	var sync = mainService.getUsers();
	var users = sync.$asArray();

	var checkAdmin = function(currentUser) {
		users.$loaded().then(function(array){
			for(var i = 0; i < array.length; i++){
				if(currentUser === array[i].email){
					if(array[i].type === "admin") {
						$localStorage.admin = true;
					}
				}
			}
		})
	}

	$scope.logMeIn = function(existUser) {
		if($scope.existUser.email === undefined || $scope.existUser.password === undefined || $scope.existUser === undefined){
			$scope.logInAlert = true;
		}
		else {	
			mainService.logUserIn(existUser.email, existUser.password).then(function(currentAuth){
				console.log(currentAuth);
				if(currentAuth){
					var currentUser = currentAuth.password.email;
					checkAdmin(currentUser);
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}
			})
		}
			$scope.existUser = '';
	}

	$scope.addUser = function(newUser, signUpConPass) {
		if(newUser.email === undefined || newUser.password === undefined || newUser === undefined) {
			$scope.logInAlert = true;
		}
		else if (newUser.password !== signUpConPass){
			$scope.unmatchPassAlert = true;
		}
		else {
				mainService.addUser(newUser.email, newUser.password).then(function(currentAuth){
				if(currentAuth){
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}

				var user = {
					email: newUser.email,
					type: "normal"
				}
				$scope.users.$add(user);
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
			$scope.logInAlert = true;
		}
		else if ($scope.changePass.newPass !== $scope.resetConPass){
			$scope.unmatchPass = true;
		}
		else {
			mainService.resetPass(changePass.email, changePass.oldPass, changePass.newPass);
		}
		$scope.changePass = '';
	}

	$scope.isClicked = function(){
		document.querySelector("#myCard").classList.toggle("flip");
	}
	
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
		$timeout(function(){
			$scope.signUp = false;			
		}, 750)
	}

	$scope.exitForgotPass = function(){
		$scope.isClicked();
		$timeout(function(){
			$scope.forgotPass = false;			
		}, 750)
	}

	$scope.exitResetPass = function() {
		$scope.isClicked();
		$timeout(function(){
			$scope.resetPass = false;			
		}, 750)
	}

	//-------Get rid of alerts--------
	$scope.dismissLogIn = function() {
		$scope.logInAlert = false;
	}

	$scope.dismissNewAlert = function() {
		$scope.unmatchPassAlert = false;
	}

	$scope.dismissResetAlert = function() {
		$scope.forgotPassAlert = false;
	}
})