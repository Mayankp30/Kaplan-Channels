angular.module('kaplanApp', ['angular.filter'])
	.controller('kaplanAppController', ['$http', '$scope', function($http, $scope) {
		

		$scope.min = function(arr) {
		    return $filter('min')
		      ($filter('map')(arr, 'time'));
		  }

		$scope.toLocaleDate = function(e) {
		    var date = e.time.substring(0,10);
		    var time = e.time.substring(11,20);

		    var newDate = new Date(date);
		   
		    var weekday = new Array("Sun", "Mon", "Tue", "Wed",
                    "Thu", "Fri", "Sat");

		    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", 
		    "September", "October", "November", "December");

		   
		    var daysDisplay = weekday[newDate.getDay()];
		    var monthDisplay = months[newDate.getMonth()];
		    var year = newDate.getFullYear();

		    var displayDate = daysDisplay + "," + monthDisplay + " " + newDate.getDate() + "," + year;	
		    
		    var dat = new Date(displayDate);
		    
		    e.date = dat.toLocaleDateString();

		    return e;
		}


		$scope.fetchData = function() {
			$http.get('/getData')
	  		.success(function(data) {
	  			$scope.objectList = data.sort(function(a,b){
				  // Turn your strings into dates, and then subtract them
				  // to get a value that is either negative, positive, or zero.
				  return new Date(a.time.substring(0,10) + "T" + b.time.substring(11,20)) - new Date(b.time.substring(0,10) + "T" + b.time.substring(11,20));
				});
	  			console.log("hello");
	  			//console.log(data);
	  			
	  		})
	  		.error(function(data) {
	  			console.log(data);
	  		});
	  	}

	  	

	}]);