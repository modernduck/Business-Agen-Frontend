(function () {
	'use stritct';

	angular
		.module('ctrl.debthtrack', [])
		.controller('DebtIndexCtrl', ['$scope', 'ngTableParams', '$filter', function ($scope, ngTableParams, $filter) {

			$scope.debtList = [
				{"id": 1, "name": "Project A", "initDebt" : 45000, "paid" : 20000, "debtor": "Lerm", "creditor": "me" },
				{"id": 2, "name": "Project B", "initDebt" : 60000, "paid" : 3000,  "debtor": "TEC", "creditor": "me"},
				{"id": 3, "name": "Project C", "initDebt" : 45000, "paid" : 4500,  "debtor": "me", "creditor": "TEC"}

			]


			$scope.tableBranch = new ngTableParams({
				page: 1,
				count: 5
			}, {
				total: debtList.length,
				getData: function($defer, params) {
					var orderedData = params.sorting() ? $filter('orderBy')(debtList, params.orderBy()) : debtList;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});



	       
			
		}])		

	    
})();