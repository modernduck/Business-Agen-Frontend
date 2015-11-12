(function () {

	'use strict';

	angular
		.module('ctrl.pos.main', ['ui-notification', 'restful'])
		.controller('PosCtrl', ['$scope', '$rootScope', '$timeout', 'cfpLoadingBar', '$state', 'Notification', 'Restful', 'PosSession',
			function ($scope, $rootScope, $timeout, cfpLoadingBar, $state, Notification, Restful, PosSession) {

				console.log('pos test ')
			PosSession.isAlive(function(){
				console.log('it alive')
			}, function(){
				console.log('going to go login')
				$state.go("app.pos.login");		
			})
			
			

			
			//console.log($state.get());*/
			
			//$state.go("app.admin.product");

		}]);
})();