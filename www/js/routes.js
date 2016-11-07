angular.module('app.routes', [])

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'MyCtrl'
    })

    .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
    })

    $urlRouterProvider.otherwise('/home')



});
