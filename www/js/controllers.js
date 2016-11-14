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

.controller('settingsCtrl', function($scope, $ionicPopup, $http){
    var serializedFileString;

    $scope.data = {};
    $scope.data.url = "http://abalobi-fisher.appspot.com";

    $http.defaults.headers.common = {};
    $http.defaults.headers.post = {};
    $http.defaults.headers.put = {};
    $http.defaults.headers.patch = {};


    /*=====================================================================
      Button Click Handler
    =====================================================================*/
    $scope.buttonClick = function(){
      // console.log("Username is " + $scope.data.username);
      // console.log(username);
      // odkConfigurator();
      var validateUsername = $scope.data.username;
      var validatePassword = $scope.data.password;
      // var validateSuccess = false;

      /*=====================================================================
        Options for HTTP Requests
      =====================================================================*/
      var GLOBAL_STATUS_CODE = 0;

      var validator_options = {
          host: 'abalobi-fisher.appspot.com',
          path: '/formList'
      };

      /*==============================================================================
        HANDLE REQUESTS HERE
      ==============================================================================*/
      //This is used to store the values in www-authenticate, which gets
      //received from the header of the first response.
      var jsonHEADERS;


      validateCredentials(validateUsername, validatePassword, false, function(){

      })



      /*=====================================================================
        Write to file here
      =====================================================================*/



      //WRITE TO FILE, alert the user when done
      try{
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
      } catch (ex){
        // console.log("Meh, you are probably in a browser.");
      }


      /*=====================================================================
        Functions
      =====================================================================*/
      function validateCredentials (username, password, success, callback) {
          console.log("Creating initial Digest Request...");

          // var req = https.get(validator_options, function(res) {
          //     jsonHEADERS = {};
          //     console.log("");
          //     console.log('STATUS CODE:\n ' + res.statusCode);
          //     console.log('HEADERS:\n ' + JSON.stringify(res.headers, null, 4));
          //     // Buffer the body entirely for processing as a whole.
          //     var bodyChunks = [];
          //     res.on('data', function(chunk) {
          //         // You can process streamed parts here...
          //         bodyChunks.push(chunk);
          //     }).on('end', function() {
          //         var body = Buffer.concat(bodyChunks);
          //         console.log(
          //             // 'BODY: \n' + beautify(body.toString(), {
          //             // indent_size: 4
          //             // }
          //             'BODY: \n' + body.toString()
          //         );
          //         // ...and/or process the entire body here.
          //
          //         //Now that the request has definitely ended,
          //         //Start a second request!
          //
          //         console.log("=========================================================");
          //         console.log("First request completed!\nCreating second request...\n");
          //         var stringFromHeaders;
          //
          //         var realm;
          //         var nonce;
          //         var qop;
          //
          //         // try {
          //             stringFromHeaders = res.headers['www-authenticate'];
          //
          //             //Store the WWW-Authenticate into a JSON
          //             jsonHEADERS = splitIntoJSON(stringFromHeaders);
          //
          //             realm = jsonHEADERS.realm;
          //             nonce = jsonHEADERS.nonce + "==";
          //             qop = jsonHEADERS.qop;
          //             var cnonce = randomString(48);
          //             var nc = "";
          //
          //             console.log("Some information on the Hashing Process:\n");
          //             console.log("Realm: " + realm +
          //                 "\nNonce: " + nonce +
          //                 "\nUsername: " + username +
          //                 "\nPassword: " + password +
          //                 "\nCNonce: " + cnonce +
          //                 "\nQop: " + qop + "\n");
          //
          //             /*
          //               HA1 = MD5(A1) = MD5(username:realm:password)
          //               HA2 = MD5(A2) = MD5(method:digestURI)
          //               response = MD5(HA1:nonce:HA2)
          //             */
          //
          //
          //
          //             //TODO: Generate MD5 hashes here.
          //             var beforeHA1 = username + ":" + realm + ":" + password;
          //             var beforeHA2 = "GET:" + "/formList";
          //
          //             var ha1 = md5(beforeHA1);
          //             var ha2 = md5(beforeHA2);
          //             var actualResponse = md5(ha1 + ":" + nonce + ":" + nc + ":" + cnonce + ":" + qop + ":" + ha2);
          //
          //             console.log("Before 1st Hash: " + beforeHA1 + "\n" +
          //                 "Before 2nd Hash: " + beforeHA2 + "\n" +
          //                 "HA1: " + ha1 + "\n" +
          //                 "HA2: " + ha2 + "\n" +
          //                 "Response: " + actualResponse + "\n");
          //
          //             digestString = "Digest username=\"" + username + "\", " +
          //                 "realm=\"abalobi-fisher ODK Aggregate\", " +
          //                 "nonce=\"" + nonce + "\", " +
          //                 "uri=\"" + "/formList" + "\", " +
          //                 "qop=" + qop + ", " +
          //                 "nc=" + ", " +
          //                 "cnonce=\"" + cnonce + "\", " +
          //                 "response=\"" + actualResponse + "\", " +
          //                 "opaque=, ";
          //
          //             //We have to set up our options now.
          //             var options2 = {
          //                 host: 'abalobi-fisher.appspot.com',
          //                 path: '/formList',
          //                 mode: 'no-cors',
          //                 headers: {
          //                     Authorization: digestString
          //                 }
          //             }
          //
          //             console.log("Your options for this request: \n" + JSON.stringify(options2, null, 4));
          //             console.log("\n\nA nicer view of your digest string: \n");
          //             console.log(nicerDigest(digestString));
          //
          //             //NOW WE MAKE A SECOND REQUEST
          //             createRequest(options2, success, callback);
          //
          //             // callback();
          //
          //         } catch (ex) {
          //             console.log("ERROR: \n" + ex);
          //             console.log("BLEH");
          //         }
          //
          //     })
          //
          // }); //End of request

          // req.on('error', function(e) {
          //     console.log('ERROR: \n' + e.message);
          // });
          //
          // var req = {
          //  method: 'POST',
          //  url: 'abalobi-fisher.appspot.com',
          //  path: '/formList',
          //  headers: {
          //    'Content-Type': undefined
          //  },
          //  data: { test: 'test' }
          // }
          //
          // $http(req).then(function(){
          //   console.log("SUCCESS!");
          // }, function(){
          //   console.log("FAILURE!");
          //
          // });

          var url = 'https://abalobi-fisher.appspot.com/formList';
          // create digest request object

          $http({
            method: 'GET',
            url: url,
            headers: {
              Authorization: "Digest test"
            }


          }).then(function successCallback(response) {
              // console.log("SUCCESS");
              // // this callback will be called asynchronously
              // // when the response is available
              // console.log(printJSON(response));
              // console.log(printJSON(response.headers()));
            }, function errorCallback(response) {
              console.log("FAILURE");
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              console.log(printJSON(response));
              console.log(printJSON(response.headers()));
              console.log("Okay, received headers.");
              console.log("=========================================================");
              console.log("First request completed!\nCreating second request...\n");

              var stringFromHeaders;

              var realm;
              var nonce;
              var qop;

              try {
                  stringFromHeaders = response.headers()['www-authenticate'];
                  console.log("HEADERS AS A STRING: " + stringFromHeaders);

                  //Store the WWW-Authenticate into a JSON
                  jsonHEADERS = splitIntoJSON(stringFromHeaders);

                  realm = jsonHEADERS.realm;
                  nonce = jsonHEADERS.nonce + "==";
                  qop = jsonHEADERS.qop;
                  var cnonce = randomString(48);
                  var nc = "";

                  console.log("Some information on the Hashing Process:\n");
                  console.log("Realm: " + realm +
                      "\nNonce: " + nonce +
                      "\nUsername: " + username +
                      "\nPassword: " + password +
                      "\nCNonce: " + cnonce +
                      "\nQop: " + qop + "\n");

                  /*
                                        HA1 = MD5(A1) = MD5(username:realm:password)
                                        HA2 = MD5(A2) = MD5(method:digestURI)
                                        response = MD5(HA1:nonce:HA2)
                                      */



                  //TODO: Generate MD5 hashes here.
                  var beforeHA1 = username + ":" + realm + ":" + password;
                  var beforeHA2 = "GET:" + "/formList";

                  var ha1 = md5(beforeHA1);
                  var ha2 = md5(beforeHA2);
                  var actualResponse = md5(ha1 + ":" + nonce + ":" + nc + ":" + cnonce + ":" + qop + ":" + ha2);

                  console.log("Before 1st Hash: " + beforeHA1 + "\n" +
                      "Before 2nd Hash: " + beforeHA2 + "\n" +
                      "HA1: " + ha1 + "\n" +
                      "HA2: " + ha2 + "\n" +
                      "Response: " + actualResponse + "\n");

                  digestString = "Digest username=\"" + username + "\", " +
                      "realm=\"abalobi-fisher ODK Aggregate\", " +
                      "nonce=\"" + nonce + "\", " +
                      "uri=\"" + "/formList" + "\", " +
                      "qop=" + qop + ", " +
                      "nc=" + ", " +
                      "cnonce=\"" + cnonce + "\", " +
                      "response=\"" + actualResponse + "\", " +
                      "opaque=, ";

                  //We have to set up our options now.
                  var options2 = {
                      host: 'abalobi-fisher.appspot.com',
                      path: '/formList',
                      mode: 'no-cors',
                      headers: {
                          Authorization: digestString
                      }
                  }

                  console.log("Your options for this request: \n" + JSON.stringify(options2, null, 4));
                  console.log("\n\nA nicer view of your digest string: \n");
                  console.log(nicerDigest(digestString));

                  //NOW WE MAKE A SECOND REQUEST
                  // createRequest(options2, success, callback);

                  // callback();

              } catch (ex) {
                  console.log("ERROR: \n" + ex);
                  console.log("BLEH");
              }
            });
      }

      function splitIntoJSON(stringToSplit) {
          var finalObject = {};

          //Separate all values into an array
          var commaSplit = stringToSplit.split(",");

          for (var i = 0; i < commaSplit.length; i++) {

              //For each pair of values, split by equals
              var equalsSplit = commaSplit[i].split("=");

              //If this is running the first time, remove the 'Digest' text
              if (i == 0) {
                  equalsSplit[0] = equalsSplit[0].replace(/Digest/g, '');
              }

              //Remove spaces from variable names
              var spacesRemoved = removeSpaces(equalsSplit[0].toString());
              finalObject[spacesRemoved.toString()] = removeEscapes(equalsSplit[1]);
          }

          return finalObject;
      }

      function removeSpaces(processMe) {
          return processMe.replace(/\s+/g, '');
      }

      function removeEscapes(processMe) {
          return processMe.replace(/\"/g, '');
      }

      function createRequest(reqOptions, success, callbackFunction) {
          var req = https.get(reqOptions, function(res) {
              console.log("=========================================================");
              GLOBAL_STATUS_CODE = res.statusCode;
              console.log('STATUS:\n ' + res.statusCode);
              // console.log('HEADERS:\n ' + JSON.stringify(res.headers, null, 4));
              // Buffer the body entirely for processing as a whole.
              var bodyChunks = [];
              res.on('data', function(chunk) {
                  // You can process streamed parts here...
                  bodyChunks.push(chunk);
              }).on('end', function() {
                  var body = Buffer.concat(bodyChunks);
                  console.log(
                  //     'BODY: \n' + beautify(body.toString(), {
                  //     indent_size: 4
                  // })
                  'BODY: \n' + body.toString()
                  );
                  // ...and/or process the entire body here.
                  if (res.statusCode == 200){
                      success = true;
                  }

                  callbackFunction(success);
              })
          });

          req.on('error', function(e) {
              console.log("INTERNAL FUNCTION ERROR");
              console.log(e);
              console.log('ERROR: \n' + e.message);
          });


      }

      var randomString = function(length) {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
      }

      var nicerDigest = function(sentDigestString) {
          var digestArray = sentDigestString.split(",");
          var escapedString = "";
          for (var i = 0; i < digestArray.length; i++) {
              escapedString += digestArray[i] + "\n";
          }
          return escapedString;
      }

      function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

          // Check if the XMLHttpRequest object has a "withCredentials" property.
          // "withCredentials" only exists on XMLHTTPRequest2 objects.
          xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

          // Otherwise, check if XDomainRequest.
          // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
          xhr = new XDomainRequest();
          xhr.open(method, url);

        } else {

          // Otherwise, CORS is not supported by the browser.
          xhr = null;

        }
        return xhr;
      }
      function appendTransform(defaults, transform) {

        // We can't guarantee that the default transformation is an array
        defaults = angular.isArray(defaults) ? defaults : [defaults];

        // Append the new transformation to the defaults
        return defaults.concat(transform);
      }

      var printJSON = function(receivedJSON){
        return JSON.stringify(receivedJSON, null, 4);
      }



  } //End of button click
})
