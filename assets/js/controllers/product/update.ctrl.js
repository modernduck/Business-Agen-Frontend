(function () {
	'use stritct';

	angular
		.module('ctrl.products.update', [])
		.controller('ProductUpdateCtrl', ['$scope', 'ngTableParams', '$filter', '$state', '$stateParams', 'Product', 'Session', 'ProductType' , function ($scope, ngTableParams, $filter, $state, $stateParams, Product, Session, ProductType) {

			$scope.product_types = ProductType.query({token:Session.getToken()}, function(){
				$scope.product = Product.get({token:Session.getToken(), id:$stateParams.productId}, function(data){
					for(var i =0; i < $scope.product_types.length ;i++)
						if($scope.product_types[i].id == $scope.product.product_type_id)
							$scope.selectedType = $scope.product_types[i];
				});

			});


			

			

			$scope.saveProduct = function()
			{
				var product_type_id = $scope.selectedType.id;
				$scope.product = angular.extend($scope.product, {id:$scope.product.id, product_type_id: product_type_id});
				Product.update({token: Session.getToken()}, $scope.product, function(result){
					if($scope.image != null)
						Product.upload({token: Session.getToken()}, {id:$scope.product.id, image:$scope.image}, function(result){
							console.log(result);
							if(result.result == "success")
								$state.go('app.admin.product.index')
						})
					else
						$state.go('app.admin.product.index')
					//
				})
			}


	       
			
		}]);
})();