// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('app', ['ionic', 'ngCordova', 'pascalprecht.translate', 'app.controllers', 'app.routes', 'app.services'])



.run(function($ionicPlatform, $translate, appState) {



    
  $ionicPlatform.ready(function() {


    /*  BEGIN SET UP FOR SECRETS.JS GLOBAL */

    var secrets = {};

    // Import variables if present (from env.js)
    if(window){  
      Object.assign(secrets, window.__secrets);
    }
    
    // Define AngularJS application
    var ngModule = angular.module('app', []);
    
    // Register environment in AngularJS as constant
    ngModule.constant('__secrets', secrets);
      
    /*  END SET UP FOR SECRETS.JS GLOBAL */



    //Select the language initially
    // appState.determineLanguage();

    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
