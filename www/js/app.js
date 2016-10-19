// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('app', ['ionic', 'ngCordova'])
  .controller('MyCtrl', function($scope, $cordovaAppVersion) {

    document.addEventListener("deviceready", function() {


      $cordovaAppVersion.getVersionNumber().then(function(version) {
        $scope.appVersion = version;
      });
    }, false);


    $scope.startODK = function() {

      var sApp = startApp.set({ /* params */
        "package": "org.odk.collect.android",
        "intentstart": "startActivity"
      }, { /* extras */ });

      sApp.check(function(values) { /* success */
        console.log(values);
      }, function(error) { /* fail */
        var x = window.confirm("You need OpenDataKit to log your catch, but it is not installed. \n\nWould you like to install it now using the Google Play Store?");
        if (x == true) {
          window.open('https://play.google.com/store/apps/details?id=org.odk.collect.android', '_system')
        }
      });


      sApp.start(function() { /* success */
        console.log(values)
      }, function(error) { /* fail */
        //alert(error);
      });

    }

    $scope.startTelegram = function() {

      var sApp = startApp.set({ /* params */
        "package": "org.telegram.messenger",
        "intentstart": "startActivity"
      }, { /* extras */ });

      sApp.check(function(values) { /* success */
        console.log(values)
      }, function(error) { /* fail */
        var x = window.confirm("You need Telegram to send messages, but it is not installed. \n\nWould you like to install it now using the Google Play Store?");
        if (x == true) {
          window.open('https://play.google.com/store/apps/details?id=org.telegram.messenger', '_system')
        }
      });

      sApp.start(function() { /* success */
        console.log(values)
      }, function(error) { /* fail */ });
    }

    $scope.startCalculator = function() {

      var sApp = startApp.set({ /* params */
        "package": "com.android.calculator2",
        "intentstart": "startActivity"
      }, { /* extras */ });

      sApp.check(function(values) { /* success */
        console.log(values)
      }, function(error) { /* fail */
        alert("No Calculator Application")
      });

      sApp.start(function() { /* success */
        console.log(values)
      }, function(error) { /* fail */ });
    }

    $scope.startAnalytics = function() {

      var sApp = startApp.set({ /* params */
        "package": "com.abalobi.fisheranalytics",
        "intentstart": "startActivity"
      }, { /* extras */ });

      sApp.check(function(values) { /* success */
        console.log(values)
      }, function(error) { /* fail */
        var x = window.confirm("You need Abalobi Analytics, but it is not installed.  \n\nWould you like to install it now using the Google Play Store?");
        if (x == true) {
          // TODO: Add the play store link
          window.open('https://play.google.com/store/apps/details?id=com.abalobi.fisheranalytics', '_system')
        }
      });

      sApp.start(function() { /* success */
        console.log(values)
      }, function(error) { /* fail */ });
    }

  })


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
