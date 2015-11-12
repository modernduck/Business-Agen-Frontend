(function () {
	'use stritct';

	angular
		.module('ctrl.products', ['restful'])
		.controller('ProductCtrl', ['$scope', 'ngTableParams', '$filter', 'Product', 'Session', function ($scope, ngTableParams, $filter, Product, Session) {
			
			var products = [
				{ "name": "POS Software(1 Yr)", "description": "1 year Service", "price": 10000, "type":"POS", "status":{value:"Avaialble", type:"info"} },
				{ "name": "POS Hardware", "description": "1 year Service", "price": 20000, "type":"POS", "status":{value:"Avaialble", type:"info"} },
				{ "name": "Cloud 1 Yr Package", "description": "Email Service + Storage", "price": 5000, "type":"Cloud", "status":{value:"Sold Out", type:"danger"} },


			]


			$scope.tableProduct = new ngTableParams({
				page: 1,
				count: 10
			}, {
				groupBy: 'type',
				total: products.length,
				getData: function($defer, params) {
					var orderedData = params.sorting() ? $filter('orderBy')(products, params.orderBy()) : products;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});



	       
			
		}]);
})();