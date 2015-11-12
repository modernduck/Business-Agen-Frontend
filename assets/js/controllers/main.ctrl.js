(function () {

	'use strict';

	angular
		.module('ctrl.main', ['ui-notification', 'restful'])
		.controller('MainCtrl', ['$scope', '$rootScope', '$timeout', 'cfpLoadingBar', '$state', 'Notification', 'Restful', 'Session', 'PosSession', '$location',
			function ($scope, $rootScope, $timeout, cfpLoadingBar, $state, Notification, Restful, Session, PosSession, $location) {

			//Notification.custom({ message: 'You just entered the Debut UI Admin Panel demo. This is Bootstrap and Agnular.js based project with just few extra js libs with <strong>NO jQuery!</strong> dependencies! <br /><br /> Just press Ctrl + Space to quickly move around the Admin Panel!', title: 'Welcome to Debut UI!', delay: 20*1000 }, 'blocked' );
	
			/*$scope.scrollbarConfig = {
				autoResize: true,
				scrollbar: {  
					width: 2,
					hoverWidth: 2,
					color: '#65cac0',
					show: false
				},
				scrollbarContainer: {
					width: 4,
					color: '#e9f0f5'
				},
				scrollTo: null
			}

			$scope.tags = ['sample tag #1','sample tag #2'];

			$scope.scrollbarConfigInner = {
				autoResize: true,
				scrollbar: {  
					width: 4,
					hoverWidth: 2,
					color: '#65cac0',
					show: false
				},
				scrollbarContainer: {
					width: 8,
					color: '#e9f0f5'
				},
				scrollTo: null
			}

			$scope.sort_add = function (e, item) {
				e.preventDefault();
				item.items.push({
					id: 12,
					title: 'Sub item 12',
					items: []
				});
			}

			// router changed state
			$rootScope.$on('$stateChangeSuccess', function (event, data) {
				$timeout(function () {
					$scope.show_page = true;
					cfpLoadingBar.complete();
				}, 500);
			});

			$rootScope.$on('$stateChangeStart', function (event, data) {
				window.scrollTo(0,0);
				$scope.show_page = false;
				cfpLoadingBar.start();
			});

			$scope.notify_primary = function () {
				Notification({ message: 'Primary notification <a href>Go to URL</a>', title: 'Primary notification'});
			}
			$scope.notify_success = function () {
				Notification.success({ message: 'Success notification', title: 'Success notification'});
			}
			$scope.notify_warning = function () {
				Notification.warning({ message: 'Warning notification', title: 'Warning notification'});
			}
			$scope.notify_info = function () {
				Notification.info({message: 'Info notification', title: 'Info notification'});
			}
			$scope.notify_error = function () {
				Notification.error({message: 'Error notification 1s', delay: 1000});
			}
			$scope.notify_custom = function () {
				Notification.custom({ message: 'Custom notification panel', title: 'Information' }, 'blocked' );
			}

			// mini chars
			$scope.miniChartDemo1 = {
				size: {
					width: 80,
					height: 40
				},
				data: {
					columns: [['data1', 120, 80, 140, 120, 140, 180, 200, 180, 140, 200, 50, 40]],
					type: 'bar',
					colors: {
						data1: '#f86774'
					}
				},
				interaction: {
					enabled: false
				},
				axis: {
					y: { show: false },
					x: { show: false }
				},
				legend: { show: false },
				tooltip: { show: false }
			};

			$scope.miniChartDemo2 = {
				size: {
					width: 80,
					height: 40
				},
				data: {
					columns: [['data1', 120, 80, 140, 120, 140, 180]],
					type: 'area-spline',
					colors: {
						data1: '#5c8cca'
					}
				},
				interaction: {
					enabled: false
				},
				axis: {
					y: { show: false },
					x: { show: false }
				},
				legend: { show: false },
				tooltip: { show: false }
			};*/
			console.log('main ctrlx')
			Restful.setPath("http://localhost/npop.in.th/newpos/service/web/");
			console.log(Restful.getPath());
			
			Session.isAlive(function(data){
				
				console.log(data)
			}, function(){
				//case fail
				PosSession.isAlive(function(data2){

				}, function(){
					//check whete it's pos path
					var path = $location.path();
				//	alert("POS OFFLINE")
					//$state.go("app.admin.login");	
				})
				
			})

			
			//console.log($state.get());*/
			
			//$state.go("app.admin.product");

		}])
		.
		controller("LogoutCtrl", ['$scope', '$rootScope', '$timeout', 'cfpLoadingBar', '$state', 'Notification', 'Restful', 'Session', 'PosSession', '$location',
			function ($scope, $rootScope, $timeout, cfpLoadingBar, $state, Notification, Restful, Session, PosSession, $location) {
				Session.logout(function(){
					$state.go("app.admin.login");

				})
				console.log('this is logout')
			}])

;
})




();