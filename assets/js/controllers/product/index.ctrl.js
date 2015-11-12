(function () {
	'use stritct';

	angular
		.module('ctrl.products', [])
		.controller('ProductCtrl', ['$scope', 'ngTableParams', '$filter', '$state', 'Product', 'Session', function ($scope, ngTableParams, $filter, $state,  Product, Session) {

			$scope.refresh = function(){
				console.log("refresh")
				$scope.products = Product.query({token:Session.getToken() }, function(data){
					
					console.log(data);
					$scope.tableProduct.reload();
					
					
				});	

			}
			$scope.products = [];
			$scope.tableProduct = new ngTableParams({
				page: 1,
				count: 10
			}, {
				groupBy: 'product_type',
				total: $scope.products.length,
				getData: function($defer, params) {
					var orderedData = params.sorting() ? $filter('orderBy')($scope.products, params.orderBy()) : $scope.products;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});
			$scope.refresh();
			
			
			$scope.deleteProduct = function(product_id)
			{
				if(confirm("Are you sure to delete this product?"))
					Product.delete({"token": Session.getToken() }, {id:product_id}, function(){
						$scope.refresh();
					});
			}

			



	       
			
		}]);
})();