angular.module('app.controllers', [])

.controller('MyCtrl', function($scope, $cordovaAppVersion, $location, $state) {

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

  $scope.openSettings = function(){
    $state.go("settings");
  }

})

.controller('settingsCtrl', function($scope, $ionicPopup){
    var serializedFileString;

    $scope.data = {};
    $scope.data.url = "http://abalobi-fisher.appspot.com";
    // $scope.username = "";
    // $scope.password = "";

    $scope.buttonClick = function(){
      // console.log("Username is " + $scope.data.username);
      // console.log(username);
      // odkConfigurator();
      var validateUsername = $scope.data.username;
      var validatePassword = $scope.data.password;


      //WRITE TO FILE, alert the user when done
      cordova.exec(
          function(data) {
            //FUNCTION TO READ FROM FILE
            function readFile(fileEntry) {

              fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function() {
                  console.log("Successful file read: " + this.result);
                  displayFileData(fileEntry.fullPath + ": " + this.result);
                };

                reader.readAsText(file);

              }, onErrorReadFile);
            }
            //FUNCTION TO WRITE TO FILE
            function writeFile(fileEntry, dataObj, isAppend) {
              // Create a FileWriter object for our FileEntry (log.txt).
              fileEntry.createWriter(function(fileWriter) {

                fileWriter.onwriteend = function() {
                  console.log("Successful file read...");
                  // readFile(fileEntry);
                };

                fileWriter.onerror = function(e) {
                  console.log("Failed file read: " + e.toString());
                };

                // If we are appending data to file, go to the end of the file.
                if (isAppend) {
                  try {
                    // fileWriter.seek(fileWriter.length);
                  } catch (e) {
                    console.log("file doesn't exist!");
                  }
                }
                var blob = new Blob([dataObj], {type:'application/java-serialized-object'});
                fileWriter.write(blob);


                // fileWriter.write(dataObj);
              });
            }

            serializedFileString = data;

            //Alert in a popup
            // alert("THE FILE IS: \n\n" + serializedFileString);

            //Now, save to FILE
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dir) {
              console.log("got main dir", dir.name);
              dir.getFile("odk/collect.settings", {
                create: true
              }, function(file) {
                console.log("got the file", file);
                writeFile(file, serializedFileString, true);

                var popupParams = {
                  title: 'Settings Saved', // String. The title of the popup.
                  cssClass: '', // String, The custom CSS class name
                  subTitle: '', // String (optional). The sub-title of the popup.
                  template: 'Your ODK settings have been saved! Please re-open ODK.', // String (optional). The html template to place in the popup body.
                  templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                  okText: '', // String (default: 'OK'). The text of the OK button.
                  okType: '', // String (default: 'button-positive'). The type of the OK button.
                }
                $ionicPopup.alert(popupParams);



              });
            });
          },
          function(error) { console.log(error);},
          "odkConfigurator",
          "coolMethod",
          [$scope.data.username, $scope.data.password]);

          //Other stuff here
          console.log("TEST");



    }
})
