(function () {
	'use strict';
	
	angular
		.module ('login')
		.controller ('loginFormCtrl', LoginForm);
	
	LoginForm.$inject = [
		'$unidevAuth',
		'$state',
		'$logger',
		'$authMessages',
		'$exception'
	];
	
	function LoginForm ($unidevAuth, $state, $logger, $authMessages, $exception) {
		var vm = this;
		var auth = $unidevAuth;
		
		vm.credentials = {
			email: '',
			password: ''
		};
		vm.submit = Login;
		
		function Login () {
			if (vm.credentials.email && vm.credentials.password) {
				auth.$authWithPassword (vm.credentials)
					.then (function (user) {
						$logger.success ($authMessages.AUTH_LOGIN_SUCCESS);
						$state.transitionTo ('dashboard');
					})
					.catch ($exception.catcher ($authMessages.AUTH_LOGIN_FAILED));
			}
		}
	}
}) ();