angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env, $timeout, $sessionStorage){
	var firebaseUrl = env.getAppUrl();
	var sync = mainService.getUsers();
	var users = sync.$asArray();

	var resetPage = function(){
		$scope.signUp = false;
		$scope.forgotFlip = false;
		$scope.reset = false;
		$scope.noInputAlert = false;
		$scope.unmatchPassAlert = false;
		$scope.forgotPassAlert = false;
		$scope.takenEmailAlert = false;
		$scope.incorrectOldPassAlert = false;
		$scope.noUserByThatNameAlert = false;
		$scope.incorrectPassAlert = false;
	}

	resetPage();

	var checkAdmin = function(checkUser) {
		users.$loaded().then(function(array){
			for(var i = 0; i < array.length; i++){
				if(checkUser === array[i].email){
					if(array[i].type === "admin") {
						$sessionStorage.admin = true;
					}
				}
			}
		})
	}

	var getCurrentUser = function(checkUser) {
		users.$loaded().then(function(array){
			debugger;
			for(var i = 0; i < array.length; i++){
				if(checkUser === array[i].email){
					$sessionStorage.currentLoggedInUser = array[i].name;
				}
			}
		})
	}

	$scope.logMeIn = function(existUser) {
		if(!existUser){
			$scope.noInputAlert = true;
		}
		else if(!existUser.email || !existUser.password){
			$scope.noInputAlert = true;
		}
		else {	
			mainService.logUserIn(existUser.email, existUser.password).then(function(currentAuth){
				if(currentAuth){
					debugger;
					var checkUser = currentAuth.password.email;
					checkAdmin(checkUser);
					getCurrentUser(checkUser);
					$location.path("/addjob")
				}
				else{
					$location.path("/login")
				}
			}, function(error){
				if(error === "INVALID_PASSWORD") {
					$scope.incorrectPassAlert = true;
				}
				else if(error === "INVALID_USER")
					$scope.noUserByThatNameAlert = true;
			})
		}
		$scope.existUser = '';
	}

	$scope.addUser = function(newUser, signUpConPass) {
		if(!newUser){
			$scope.noInputAlert = true;
		}
		else if(!newUser.email || !newUser.password || !newUser.name || !signUpConPass) {
			$scope.noInputAlert = true;
		}
		else if (newUser.password !== signUpConPass){
			$scope.unmatchPassAlert = true;
		}
		else {
				mainService.addUser(newUser.email, newUser.password).then(function(currentAuth){
					if(currentAuth){
						var user = {
							email: newUser.email,
							name: newUser.name,
							type: "normal"
						};
						users.$add(user);
		
						var checkUser = currentAuth.password.email;
						$timeout(function(){
							getCurrentUser(checkUser);
						}, 250)
						$location.path("/addjob")
					}
					
					else{
						$location.path("/login")
					}
				
					newUser.email = '';
					newUser.name = '';
					newUser.password = '';
					$scope.signUpConPass = '';

					$scope.exitSignUp();
			},function(error){
				if (error === "EMAIL_TAKEN"){
					$scope.takenEmailAlert = true;
				}

				newUser.email = '';
				newUser.name = '';
				newUser.password = '';
				$scope.signUpConPass = '';
			});
		}
	}

	$scope.forgotPass = function(email) {
		if(!email) {
			$scope.forgotPassAlert = true;
		}
		else {
			mainService.forgotPass(email).then(function(){
				$scope.exitForgotPass();
			}, function(error){
				if(error === "INVALID_USER"){
					$scope.noUserByThatNameAlert = true;
				}
			});
		}
		email = '';
	}

	$scope.resetPassword = function(changePass, resetConPass) {
		if(!changePass){
			$scope.noInputAlert = true;
		}
		else if(!changePass.email || !changePass.oldPass || !changePass.newPass || !resetConPass) {
			$scope.noInputAlert = true;
		}
		else if (changePass.newPass !== resetConPass){
			$scope.unmatchPassAlert = true;
		}
		else {
			mainService.resetPass(changePass.email, changePass.oldPass, changePass.newPass).then(function(){
				$scope.exitResetPass();
			}, function(error){
				if(error === "INVALID_PASSWORD"){
					$scope.incorrectOldPassAlert = true;
				}
				else if(error === "INVALID_USER"){
					$scope.noUserByThatNameAlert = true;
				}
			});
		}
		changePass.email = '';
		changePass.oldPass = '';
		changePass. newPass = '';
		$scope.resetConPass = '';
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
		$scope.forgotFlip = true;
		$scope.isClicked();
	}

	$scope.showReset = function() {
		$scope.reset = true;
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
			$scope.forgotFlip = false;			
		}, 750)
	}

	$scope.exitResetPass = function() {
		$scope.isClicked();
		$timeout(function(){
			$scope.reset = false;			
		}, 750)
	}

	$scope.dismissAlerts = function(){
		$scope.noInputAlert = false;
		$scope.unmatchPassAlert = false;
		$scope.forgotPassAlert = false;
		$scope.takenEmailAlert = false;
		$scope.noUserByThatNameAlert = false;
		$scope.incorrectOldPassAlert = false;
		$scope.incorrectPassAlert = false;
	}
})