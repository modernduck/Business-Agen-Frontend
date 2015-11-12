(function () {
	'use strict';

	angular
		.module('ctrl.pos.login', [])
		.controller('LoginPosCtrl', ['$scope', '$interval', '$state', 'Brand', 'PosSession', 'Restful', '$stateParams', 'Pos', 'Session' , function ($scope, $interval, $state, Brand, PosSession, Restful, $stateParams, Pos, Session) {

			Restful.setPath("http://localhost/npop.in.th/newpos/service/web/");
			console.log(Restful.getPath())
			$scope.branches = Pos.branches({id:$stateParams.brandId} , function(data){

				//alert("success");	
				console.log(data);
				
			})
			$scope.selectedBranch = {};
			$scope.login = function()
			{
				//console.log(Restful.getPath());
				console.log($scope.selectedBranch)
				console.log($scope.name)
				console.log($scope.password)
				Pos.authen({name:$scope.name, password:$scope.password, id:$scope.selectedBranch.branch.id}, function(result){
					if(result.status == "complete")
					{
						//alert('complete')
						console.log(result)
						PosSession.setToken(result.token);

						$state.go("app.pos.dashboard");
					}
				})
			}
			
			console.log("yo man")

		}]);
		

})();