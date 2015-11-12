(function () {
	'use stritct';

	angular
		.module('ctrl.products.category', [])

		.controller('CategoryIndexCtrl', ['$scope', 'ngTableParams', '$filter', '$state', 'Product', 'ProductType', 'Session', function ($scope, ngTableParams, $filter, $state, Product , ProductType, Session) {
			$scope.refresh = function(){
				console.log("refresh")
				$scope.product_types = ProductType.query({token:Session.getToken()}, function(data){	
					console.log(data);
					$scope.tableProduct.reload();
				});	

			}
			$scope.product_types = [];
			$scope.product_types = ProductType.query({token:Session.getToken()}, function(){
				console.log('init product types')
				console.log($scope.product_types)
				$scope.tableProduct = new ngTableParams({
					page: 1,
					count: 5
				}, {
					total: $scope.product_types.length,
					getData: function($defer, params) {
						var orderedData = params.sorting() ? $filter('orderBy')($scope.product_types, params.orderBy()) : $scope.product_types;
						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
					}
				});


			});
			
			$scope.delete = function(id)
			{
				ProductType.delete({token:Session.getToken()}, {id:id}, function() {
					$scope.refresh();
				})
			}
			
			
		}])
		.controller('CategoryUpdateCtrl', ['$scope', 'ngTableParams', '$filter', '$state', '$stateParams', 'Session', 'ProductType' , function ($scope, ngTableParams, $filter, $state, $stateParams , Session, ProductType) {

			$scope.category = ProductType.get({token:Session.getToken(), id:$stateParams.productTypeId})

			$scope.saveCategory = function()
			{
				ProductType.update({token:Session.getToken()}, $scope.category , function(){
					$state.go("app.admin.product.category.index");
				});
			}
		}])
		.controller('CategoryCreateCtrl', ['$scope', 'ngTableParams', '$filter', '$state', '$stateParams', 'Session', 'ProductType' , function ($scope, ngTableParams, $filter, $state, $stateParams , Session, ProductType) {

			//$scope.category = ProductType.get({token:Session.getToken(), id:$stateParams.productTypeId})

			$scope.saveCategory = function()
			{
				ProductType.save({token:Session.getToken()}, $scope.category , function(){
					$state.go("app.admin.product.category.index");
				});
			}
		}])
})();