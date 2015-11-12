(function () {
	'use stritct';

	angular
		.module('ctrl.branch', [])
		.controller('BranchIndexCtrl', ['$scope', 'ngTableParams', '$filter', 'Branch' ,'Session', function ($scope, ngTableParams, $filter, Branch, Session) {

			
			$scope.refresh = function()
			{
				$scope.branches = Branch.query({token:Session.getToken()}, function(){
					$scope.tableBranch.reload();
				})
					
			}
			
			$scope.branches = Branch.query({token:Session.getToken()}, function(){
				console.log('init set')
				console.log($scope.branches)
				$scope.tableBranch = new ngTableParams({
					page: 1,
					count: 5
				}, {
					total: $scope.branches.length,
					getData: function($defer, params) {
						var orderedData = params.sorting() ? $filter('orderBy')($scope.branches, params.orderBy()) : $scope.branches;
						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
					}
				});	
			})
			

			//$scope.refresh();

	       
			
		}])
		.controller('BranchCreateCtrl', ['$scope', 'ngTableParams', '$filter', '$state', '$stateParams', 'Session', 'Branch', 'Inventory', 'Product', 'Employee' , function ($scope, ngTableParams, $filter, $state, $stateParams, Session, Branch, Inventory, Product, Employee){

			

			var employees = []
			$scope.isNew = true;
			$scope.saveBranch = function()
			{
				Branch.save({token:Session.getToken()}, $scope.branch, function(){
					$state.go('app.admin.branch.index')
				});
			}


			//	console.log('create')


	       
			
		}])
		.controller('BranchUpdateCtrl', ['$scope', 'ngTableParams', '$filter', '$state', '$stateParams', 'Session', 'Branch', 'Inventory', 'Product', 'Employee' , function ($scope, ngTableParams, $filter, $state, $stateParams, Session, Branch, Inventory, Product, Employee) {

			$scope.test = function()
			{
				console.log("this is a test");
			}

			$scope.refresh = function(){
				$scope.branch = Branch.get({token:Session.getToken(), id:$stateParams.branchId, expand:"inventories,employees"}, function(){
					
				});	
			}

			$scope.refreshInventory = function()
			{
				$scope.inventories = Inventory.query({token:Session.getToken(), branch_id:$stateParams.branchId}, function(){
					$scope.tableProduct.reload();
				});
			}

			$scope.refreshEmployee = function()
			{
				$scope.employees = Employee.query({token:Session.getToken(), branch_id:$stateParams.branchId}, function(){
					$scope.tableEmployee.reload();
				});
			}
			
			$scope.products = Product.query({token:Session.getToken()});
			$scope.branch = Branch.get({token:Session.getToken(), id:$stateParams.branchId, expand:"inventories,employees"}, function(){			
				
				console.log($scope.branch)
			});


			$scope.inventories = Inventory.query({token:Session.getToken(), branch_id:$stateParams.branchId}, function(){
				$scope.tableProduct =new ngTableParams({
						page: 1,
						count: 10
					}, {
						groupBy: 'product_type',
						total: $scope.inventories.length,
						getData: function($defer, params) {
							var orderedData = params.sorting() ? $filter('orderBy')($scope.inventories, params.orderBy()) : $scope.inventories;
							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						}
					});	
			})

			$scope.employees = Employee.query({token:Session.getToken(), branch_id:$stateParams.branchId}, function(){

				$scope.tableEmployee =new ngTableParams({
						page: 1,
						count: 10
					}, {
						total: $scope.inventories.length,
						getData: function($defer, params) {
							var orderedData = params.sorting() ? $filter('orderBy')($scope.employees, params.orderBy()) : $scope.employees;
							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						}
					});	
			})

			$scope.user = {level:1};
			$scope.createEmployee = function()
			{
				var user = $scope.user;
				user.branch_id = $scope.branch.id
				console.log(user);
				if(user.password != user.repassword)
					alert("Password not match")
				else
					Employee.save({token:Session.getToken()}, user, function(){
						$scope.refreshEmployee();
					})
			}


			$scope.selectedProduct  = {};
			$scope.createInventory = function()
			{

				console.log($scope.selectedProduct)
				Inventory.save({token:Session.getToken()}, {branch_id:$scope.branch.id, product_id:$scope.selectedProduct.product.id, count:$scope.selectedProduct.count}, function(){
					$scope.refreshInventory();
				})
			}

			$scope.addStock = function(product_id, amount)
			{
				var addAmount = prompt("Added amount?")
				//if(angular.isNumber(addAmount))
					addAmount = Number(addAmount);
			//	else
			//		return false;

				Inventory.update({token: Session.getToken()}, {branch_id:$scope.branch.id, id:product_id, count:(addAmount+amount)}, function(){
					$scope.refreshInventory();
				})
			}

			$scope.updateStock = function(product_id, amount)
			{
				var newAmount = prompt("Amount?", amount);
				Inventory.update({token: Session.getToken()}, {branch_id:$scope.branch.id, id:product_id, count:newAmount}, function(){
					$scope.refreshInventory();
				})
			}

			$scope.removeStock = function(product_id)
			{
				if(confirm("Are you sure to remove this product from this branch"))
					Inventory.delete({token: Session.getToken()}, {branch_id:$scope.branch.id, id:product_id}, function(){
						$scope.refreshInventory();
					})
			}

			$scope.saveBranch = function()
			{
				Branch.update({token:Session.getToken()}, $scope.branch, function(){
					$state.go('app.admin.branch.index')
				});
			}

			$scope.deleteBranch = function()
			{
				var checkMsg  = prompt("Please type this branch's name to confirm delete")
				if(checkMsg == $scope.branch.name)
					Branch.delete({token:Session.getToken()}, {id:$scope.branch.id}, function(){
						$state.go('app.admin.branch.index')
					})
			}
	       
			
		}])
})();