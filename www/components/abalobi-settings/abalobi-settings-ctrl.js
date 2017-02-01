angular.module('app.controllers').controller('AbalobiSettingsCtrl', function($scope, $cordovaAppVersion, $location, $state) {

	
	
    $scope.$on('$ionicView.enter', function() {
    	$scope.language = "English";
    });
})
