angular.module('app.controllers').controller('AbalobiSettingsCtrl', ['$scope', '$cordovaAppVersion', '$location', '$state', 'appState', '$translate',
        function($scope, $cordovaAppVersion, $location, $state, appState, $translate) {
/*============================================================================
     Initialization
============================================================================*/
    //Setup variables
    $scope.language = appState.getLanguage();
    console.log("Appstate getLanguage: " +  appState.getLanguage());

    $scope.$on('$ionicView.enter', function() {
        //Change this to read from file
        $scope.language = appState.getLanguage();
    });


/*============================================================================
     Functions
============================================================================*/
    $scope.switchLanguage = function(){
        // appState.setLanguage($scope.vm.language);
        // $scope.$apply;
        // console.log("Language: " + $scope.language);
    };

    //This will trigger every time language changes
    $scope.$watch('language', function() {
        appState.setLanguage($scope.language);

    });

    $scope.button_save_settings = function(){
        $state.go('home');
    }
}]);


