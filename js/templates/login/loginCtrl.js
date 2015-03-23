angular.module("hgysaJobs").controller("loginCtrl", function($scope, mainService, $location, env, $timeout, $localStorage){
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
	}

	resetPage();

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
		if(!existUser){
			$scope.noInputAlert = true;
		}
		else if(!existUser.email || !existUser.password){
			$scope.noInputAlert = true;
		}
		else {	
			mainService.logUserIn(existUser.email, existUser.password).then(function(currentAuth){
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
		if(!newUser){
			$scope.noInputAlert = true;
		}
		else if(!newUser.email || !newUser.password || !signUpConPass) {
			$scope.noInputAlert = true;
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
					};
					users.$add(user);
					$scope.exitSignUp();
			},function(error){
				if (error.code === "EMAIL_TAKEN"){
					$scope.takenEmail = true;
				}

				newUser = '';
				conPass = '';
			});
		}
		newUser.email = '';
		newUser.password = '';
		$scope.signUpConPass = '';
	}

	$scope.forgotPass = function(email) {
		if(!email) {
			$scope.forgotPassAlert = true;
		}
		else {
			mainService.forgotPass(email).then(function(){
				$scope.exitForgotPass();
			}, function(error){
				if(error.code === "INVALID_USER"){
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
				debugger;
				$scope.exitResetPass();
			}, function(error){
				if(error.code === "INVALID_PASSWORD"){
					$scope.incorrectOldPassAlert = true;
				}
				else if(error.code === "INVALID_USER"){
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
		$scope.takenEmail = false;
		$scope.noUserByThatName = false;
		$scope.incorrectOldPassAlert = false;
		$scope.noUserByThatNameAlert = false;
	}
})