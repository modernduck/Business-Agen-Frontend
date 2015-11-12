(function () {
	'use stritct';

	angular
		.module('ctrl.employee', [])
		.controller('EmployeeCtrl', ['$scope', 'ngTableParams', '$filter', function ($scope, ngTableParams, $filter) {

			var employees = [
				{ "name": "Sompop", "position": "Manager"},
				{ "name": "Pannapat", "position": "Staff"},
				{ "name": "Jutapop", "position": "Staff"},


			]

			
			$scope.tableEmployee = new ngTableParams({
				page: 1,
				count: 5
			}, {
				total: employees.length,
				getData: function($defer, params) {
					var orderedData = params.sorting() ? $filter('orderBy')(employees, params.orderBy()) : employees;
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});
	       
			
		}])
		.controller('EmployeeCreateCtrl', ['$scope', 'ngTableParams', '$filter', function ($scope, ngTableParams, $filter) {

			
			$scope.user = {



			}
	       
			
		}])
		.controller('EmployeeUpdateCtrl', ['$scope', 'ngTableParams', '$filter', function ($scope, ngTableParams, $filter) {

			$scope.user = {}
			$scope.user.username = "modernduck"
			$scope.user.password="12345"
			$scope.user.address = "1010 suthisan dindang bangkok"
			$scope.user.name = "Sompop"
			$scope.user.lastname = "Yo man";
			
		}])
})();