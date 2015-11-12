(function () {
	'use stritct';

	angular
		.module('ctrl.products.create', [])

		.controller('ProductCreateCtrl', ['$scope', 'ngTableParams', '$filter', '$state', 'Product', 'ProductType', 'Session', function ($scope, ngTableParams, $filter, $state, Product , ProductType, Session) {

			$scope.product_types = ProductType.query({token:Session.getToken()});

			
			$scope.saveProduct = function()
			{
				var product_type_id = $scope.selectedType.id;
				$scope.product = angular.extend($scope.product, {product_type_id: product_type_id});
				Product.save({token: Session.getToken()}, $scope.product, function(result){
					console.log("done save going to upload")
					console.log(result)
					$scope.product.id = result.id;
					$scope.product.image = $scope.image;
					Product.upload({token: Session.getToken()}, $scope.product, function(uploadResult) {
						$state.go('app.admin.product.index')	
					})
					
				})
			}

	       
			
		}]);
})();