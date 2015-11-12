(function () {
	'use strict';

	angular
		.module('ctrl.login', [])
		.controller('LoginCtrl', ['$scope', '$interval', '$state', 'Brand', 'Session', 'Restful' , function ($scope, $interval, $state, Brand, Session, Restful) {

			$scope.login = function()
			{
				console.log(Restful.getPath());
				$scope.result = Brand.getTokenByEmail({email:$scope.email, password:$scope.password}, function(result){
					if(result.result == "success")
					{
						Session.setStatus(Session.STATUS_LOGIN);
						Session.setToken(result.data.token);
						Session.setBrandId(result.data.id)
						console.log(Session.getToken());
						$state.go("app.admin.dashboard");

					}else
						console.log("authen fail")
				})
			}
			Session.isAlive(function(data){
				
				$state.go("app.admin.dashboard");
			}, function(){
				
			});
			
			console.log("yo man")

		}]);
		

})();