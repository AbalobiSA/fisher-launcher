angular.module('app.controllers').controller('settingsCtrl', function ($scope, $ionicPopup, $ionicLoading, $state, $http, $translate) {
    var serializedFileString;

    $scope.data = {};
    $scope.data.url = "http://server.abalobi.info/formList";

    $http.defaults.headers.common = {};
    $http.defaults.headers.post = {};
    $http.defaults.headers.put = {};
    $http.defaults.headers.patch = {};


    /*=====================================================================
      Button Click Handler
    =====================================================================*/
    $scope.buttonClick = function () {
        // console.log("Username is " + $scope.data.username);
        // console.log(username);
        // odkConfigurator();
        var validateUsername = $scope.data.username;
        var validatePassword = $scope.data.password;
        var validateUrl = $scope.data.url;
        // var validateSuccess = false;


        /*==============================================================================
          HANDLE REQUESTS HERE
        ==============================================================================*/
        //This is used to store the values in www-authenticate, which gets
        //received from the header of the first response.
        var jsonHEADERS;


        validateCredentials(
            validateUsername,
            validatePassword,
            false,
            handle_login_success,
            handle_login_error
        );

        function handle_login_success () {
            console.log("ABSOLUTE MEGA SUCCESS!!!!!!!!");
            $ionicLoading.hide();
            /*=====================================================================
              Write to file here
            =====================================================================*/
            serializedFileString = {
                "general": {
                    "autosend": "wifi_and_cellular",
                    "analytics": false,
                    "default_completed": true,
                    "delete_send":false,
                    "formlist_url" : "/formList",
                    "high_resolution":false,
                    "image_size": "very_small",
                    "map_sdk_behavior":"google_maps",
                    "metadata_username": validateUsername,
                    "navigation":"swipe",
                    "password": validatePassword,
                    "protocol":"odk_default",
                    "server_url": "http://server.abalobi.info",
                    "username": validateUsername
                },
                "admin": {
                    "mark_as_finalized": false,
                    "analytics": false,
                    "change_constraint_behavior": false,
                    "save_as": false,
                    "delete_after_send": false,
                    "change_autosend": false,
                    "change_form_metadata": false,
                    "show_splash_screen": false,
                    "change_navigation": false,
                    "show_map_sdk": false,
                    "instance_form_sync": false,
                    "default_to_finalized": false,
                    "high_resolution": false,
                    "show_map_basemap": false
                }
            };

            serializedFileString = JSON.stringify(serializedFileString, null, 4);

            //WRITE TO FILE, alert the user when done
            try {
                //FUNCTION TO READ FROM FILE
                function readFile(fileEntry) {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            console.log("Successful file read: " + this.result);
                            displayFileData(fileEntry.fullPath + ": " + this.result);
                        };

                        reader.readAsText(file);
                    }, onErrorReadFile);
                }

                //FUNCTION TO WRITE TO FILE
                function writeFile(fileEntry, dataObj, isAppend) {
                    // Create a FileWriter object for our FileEntry (log.txt).
                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function () {
                            console.log("Successful file read...");
                            // readFile(fileEntry);
                        };

                        fileWriter.onerror = function (e) {
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
                        var blob = new Blob([dataObj], {type: 'application/json'});
                        fileWriter.write(blob);


                        // fileWriter.write(dataObj);
                    });
                }

                // serializedFileString = data;

                //Alert in a popup
                // alert("THE FILE IS: \n\n" + serializedFileString);

                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    console.log(dir);
                    dir.filesystem.root.getDirectory("odk", {create: true}, gotDir);
                });

                function gotDir(dirEntry) {
                    // dirEntry.getFile("temp.txt", {create: true, exclusive: true}, gotFile);
                    dirEntry.getFile("collect.settings.json", {
                        create: true
                    }, function (file) {
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
                        $state.go("home");


                    });
                }

                // Now, save to FILE
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    console.log("got main dir", dir.name);
                    // dir.root.getDirectory("odk")
                });//End of requesting local file system URL
            } catch (ex) {
                // console.log("Meh, you are probably in a browser.");
            }


        }

        function handle_login_error () {
            //THIS IS THE ERROR CALLBACK
            $ionicLoading.hide();
            var popupParams = {
                title: 'Login Error', // String. The title of the popup.
                cssClass: '', // String, The custom CSS class name
                subTitle: '', // String (optional). The sub-title of the popup.
                template: 'Your details were incorrect! Please check your username and password, and try again.', // String (optional). The html template to place in the popup body.
                templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                okText: '', // String (default: 'OK'). The text of the OK button.
                okType: '', // String (default: 'button-positive'). The type of the OK button.
            };
            $ionicPopup.alert(popupParams);
        }


        /*=====================================================================
          Functions
        =====================================================================*/
        function validateCredentials(username,
                                     password,
                                     success,
                                     successCallbackMain,
                                     errorCallbackMain) {
            console.log("Creating initial Digest Request...");

            var url = validateUrl;
            // create digest request object


            $ionicLoading.show({
                template: 'Logging in. Please wait 15s...'
                + "<br /><ion-spinner></ion-spinner>"
            });
            //TODO: Add translations for all user-visible text in this file


            $http({
                method: 'GET',
                url: url,
                headers: {
                    Authorization: "Digest test"
                }


            }).then(function successCallback(response) {
                $ionicLoading.hide();
                console.log("SUCCESS");
                // // this callback will be called asynchronously
                // // when the response is available
                // console.log(printJSON(response));
                var popupParams = {
                    title: 'ODK Already Set', // String. The title of the popup.
                    cssClass: '', // String, The custom CSS class name
                    subTitle: '', // String (optional). The sub-title of the popup.
                    template: 'You have already logged in. Please restart ODK Collect.', // String (optional). The html template to place in the popup body.
                    templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                    okText: '', // String (default: 'OK'). The text of the OK button.
                    okType: '', // String (default: 'button-positive'). The type of the OK button.
                }
                $ionicPopup.alert(popupParams);
                try {
                    console.log(printJSON(response.headers()));
                    console.log(response.data);

                } catch (ex) {

                }
                $state.go("home");

            }, function errorCallback(response) {
                console.log("FAILURE");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(printJSON(response));
                try {
                    console.log(printJSON(response.headers()));

                } catch (ex) {

                }
                console.log("Okay, received headers.");
                console.log("=========================================================");
                console.log("First request completed!\nConstructing second request...\n");

                var stringFromHeaders;

                var realm;
                var nonce;
                var qop;

                try {
                    stringFromHeaders = response.headers()['www-authenticate'] || response.headers()['WWW-Authenticate'];
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

                    var ha1 = CryptoJS.MD5(beforeHA1);
                    var ha2 = CryptoJS.MD5(beforeHA2);
                    var actualResponse = CryptoJS.MD5(ha1 + ":" + nonce + ":" + nc + ":" + cnonce + ":" + qop + ":" + ha2);

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
                        url: url,
                        headers: {
                            Authorization: digestString
                        }
                    };

                    console.log("Your options for this request: \n" + JSON.stringify(options2, null, 4));
                    console.log("\n\nA nicer view of your digest string: \n");
                    console.log(nicerDigest(digestString));

                    //NOW WE MAKE A SECOND REQUEST
                    createRequest(options2, success, successCallbackMain, errorCallbackMain);

                    // callback();

                } catch (ex) {
                    console.log("ERROR: \n" + ex);
                    console.log("BLEH");
                    errorCallbackMain();
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

        function createRequest(reqOptions, success, callbackFunction, callbackError) {
            console.log("Executing second request...");
            $http(reqOptions).then(function successCallback(response) {
                if (response.status == 200) {
                    callbackFunction();
                }
                else {
                    console.log("ERROR STATUS = " + response.status);
                    callbackError();
                }
                // console.log("SUCCESS");
                // // this callback will be called asynchronously
                // // when the response is available
                // console.log(printJSON(response));
                // console.log(printJSON(response.headers()));
            }, function errorCallback(response) {
                callbackError();
            });
        }

        var randomString = function (length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        var nicerDigest = function (sentDigestString) {
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

        var printJSON = function (receivedJSON) {
            return JSON.stringify(receivedJSON, null, 4);
        };




    }; //End of button click

})
