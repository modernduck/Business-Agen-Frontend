angular.module("restful", ['ngResource', 'ngFileUpload'])

		.factory("Restful", function() {
			var webpath = "";
			return {
					setPath : function (newValue)
					{
						localStorage['restful.path'] = newValue;
						webpath = newValue;
					},
					getPath : function()
					{

						return localStorage['restful.path'];
					}

			};

		})
		.factory("Session", ["Brand", function(Brand) {
			return {
				STATUS_LOGIN : "1",
				STATUS_OLD_TOKEN : "2",
				STATUS_LOGOUT: "3",
				isAlive : function(success, fail)
				{
					var isFail = false;
					if(angular.isUndefined(localStorage['restful.status']))
						isFail = true;
					else if(localStorage['restful.status'] == this.STATUS_LOGOUT)
						isFail = true;
					if(angular.isUndefined(localStorage['restful.brand_id']))
						isFail = true;
					if(angular.isUndefined(localStorage['restful.token']))
						isFail = true;
					
					if(!isFail)
						Brand.check(
								{token:localStorage['restful.token'], id:localStorage['restful.brand_id']},
								function(data){
									if(data.result == "success")
										success(data);
									else
										fail(data);
								},
								fail()
						)
					else
						fail();

				},
				getBrandId : function()
				{
					return localStorage['restful.brand_id'];
				},
				setBrandId : function(brand_id)
				{
					localStorage['restful.brand_id'] = brand_id;
				},
				getStatus : function()
				{
					return localStorage['restful.status'];
				},
				setStatus : function(status)
				{
					localStorage['restful.status']  = status
				},
				setToken : function(token)
				{
					localStorage['restful.token']  = token
				},
				getToken : function()
				{
					return localStorage['restful.token'];
				},
				logout : function(callback)
				{
					this.setStatus(this.STATUS_LOGOUT);
					callback();
				}

			}

		}])
		.factory("PosSession", ["Pos", function(Brand) {
			return {
				STATUS_LOGIN : "1",
				STATUS_OLD_TOKEN : "2",
				STATUS_LOGOUT: "3",
				isAlive : function(success, fail)
				{
					var isFail = false;
					if(angular.isUndefined(localStorage['pos.status']))
						isFail = true;
					if(angular.isUndefined(localStorage['pos.brand_id']))
						isFail = true;
					if(angular.isUndefined(localStorage['pos.token']))
						isFail = true;
					console.log('isAlive pos')
					console.log(isFail)
					if(!isFail)
						Pos.token(
								{token:localStorage['pos.token']},
								success,
								fail
						)
					else
						fail();

				},
				getBrandId : function()
				{
					return localStorage['pos.brand_id'];
				},
				setBrandId : function(brand_id)
				{
					localStorage['pos.brand_id'] = brand_id;
				},
				getStatus : function()
				{
					return localStorage['pos.status'];
				},
				setStatus : function(status)
				{
					localStorage['pos.status']  = status
				},
				setToken : function(token)
				{
					localStorage['pos.token']  = token
				},
				getToken : function()
				{
					return localStorage['pos.token'];
				}

			}

		}])


		.factory('Brand', ['$resource' , 'Restful',
		  function($resource, Restful){
		    var resource =  $resource(Restful.getPath() + 'brands/:id/:action', {}, {
		      query: {method:'GET', isArray:true},
		      update: {method:"PUT", params:{id:"@id"}},
		      delete: {method:"DELETE", params:{id:"@id"}},
		      getToken: {method:"GET" },
		      getTokenByEmail : {method:"GET", params:{ action:"token-by-email"} },
		      check: {method:"GET", params:{id:"@id", action:"check"}},
		    });
		   // resource = tokenHandler.wrapActions( resource, ["update"] );
  			return resource

		  }])
		.factory('Branch', ['$resource', 'Restful',
		  function($resource, Restful){
		    return $resource(Restful.getPath() + 'branches/:brand_id', {}, {
		      query: {method:'GET', isArray:true},
		      get: {method:"GET", params:{id:"@id"}},
		      update: {method:"PUT", params:{id:"@id"}},
		      delete: {method:"DELETE", params:{id:"@id"}},
		    });
		  }])
		.factory('ProductType', ['$resource', 'Restful',
		  function($resource, Restful){
		    return $resource(Restful.getPath() + 'product-types/:id', {}, {
		      query: {method:'GET', isArray:true},
		      update: {method:"PUT", params:{id:"@id"}},
		      delete: {method:"DELETE", params:{id:"@id"}},
		      remove: {method:"DELETE", params:{id:"@id"}},
		    });
		  }])
		.factory('Product', ['$resource', 'Restful', 'Session', 'Upload' ,'$filter',
		  function ($resource, Restful, Session, Upload, $filter){
		    var resource = $resource(Restful.getPath() + 'products/:id', {}, {
		      query: {method:'GET', isArray:true},
		      update: {method:"PUT", params:{id:"@id"}},
		      delete: {method:"DELETE", params:{id:"@id"}},
		    });

		    resource.upload = function(token_obj, params, success)
		    {
		    	console.log('gonna upload')
		    	Upload.upload({
			      url: (Restful.getPath() + 'products/' + params.id) + "/upload?token=" + token_obj.token,
			      method: 'POST',
			      headers: {
			        
			      },
			      file: params.image,
			    }).success(function(data){
			    	success(data)
			    });
		    }

		    return resource
		  }])
		.factory('Branch', ['$resource', 'Restful',
		  function($resource, Restful){
		    return $resource(Restful.getPath() + 'branches/:id', {}, {
		      query: {method:'GET', isArray:true},
		      update: {method:"PUT", params:{id:"@id"}},
		      delete: {method:"DELETE", params:{id:"@id"}},

		    });
		  }])
		.factory('Inventory', ['$resource', 'Restful',
		  function($resource, Restful){
		    return $resource(Restful.getPath() + 'branches/:branch_id/inventories/:id', {}, {
		      query: {method:'GET', params:{branch_id:"@branch_id"}, isArray:true},
		      save: {method:"POST", params:{branch_id:"@branch_id"}},
		      update: {method:"PUT", params:{branch_id:"@branch_id", id:"@id"}},
		      delete: {method:"DELETE", params:{branch_id:"@branch_id", id:"@id"}},
		      get: {method:"GET", params:{branch_id:"@branch_id", id:"@id"}},
		    });
		  }])
		.factory('Employee', ['$resource', 'Restful',
		  function($resource,  Restful){
		    return $resource(Restful.getPath() + 'branches/:branch_id/employees/:id', {}, {
		      query: {method:'GET', params:{branch_id:"@branch_id"}, isArray:true},
		      save: {method:"POST", params:{branch_id:"@branch_id"}},
		      update: {method:"PUT", params:{branch_id:"@branch_id", id:"@id"}},
		      delete: {method:"DELETE", params:{branch_id:"@branch_id", id:"@id"}},
		      get: {method:"GET", params:{branch_id:"@branch_id", id:"@id"}},
		    });
		  }])
		.factory('Sale', ['$resource', 'Restful',
		  function($resource, Restful){
		    return $resource(Restful.getPath() + 'sales/:id', {}, {
		      query: {method:'GET', params:{}, isArray:true},
		      update: {method:"PUT", params:{id:"@id"}},
		      delete: {method:"DELETE", params:{id:"@id"}},
		      get:{method:"GET", params:{id:"@id"}},
		    });
		  }])
		.factory("Pos", ['$resource', 'Restful',
		  function($resource, Restful){
		    return $resource(Restful.getPath() + 'pos/:action/:id', {}, {
		      branches : {method:"GET", params:{action:"branches", id:"@id"}, isArray:true},
		      authen: {method:'GET', params:{action:"authen", id:"@id"}},
		      token: {method:"GET", params:{action:"token"}},
		      inventories: {method:"GET", params:{action:"inventories"}},
		      get:{method:"GET", params:{id:"@id"}},
		    });
		  }])