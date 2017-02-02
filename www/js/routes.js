angular.module('app.routes', [])

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider, $translateProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);

    $translateProvider.useStaticFilesLoader({
        prefix: 'data/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage("en");
    $translateProvider.useSanitizeValueStrategy('sanitize');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



    .state('home', {
        url: '/home',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'
    })

    .state('settings', {
        url: '/settings',
        templateUrl: 'components/odk_settings/settings.html',
        controller: 'settingsCtrl'
    })

    .state('abalobi-settings', {
        url: '/abalobi-settings',
        templateUrl: 'components/abalobi-settings/abalobi-settings.html',
        controller: 'AbalobiSettingsCtrl'
    })

    .state('help-main', {
        url: '/help',
        templateUrl: 'components/help_main/help_main.html',
        controller: 'help_mainCtrl'
    })    

    $urlRouterProvider.otherwise('/home')



});
