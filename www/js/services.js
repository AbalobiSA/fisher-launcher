/*
    Services File

    This module is used for all global services / classes with
    built in methods. If you make a new service, best practice is
    to make getters and setters for any internal variables, 
    as the state of these variables is shared between all
    controllers.
*/
angular.module('app.services', [])

.service('fileStorage', function($ionicPopup, $state) {

    //File Writing Code Goes Here

    this.writeFileCustom = function(filename, filepath, info, mime_type) {

            //Config Variables
            ABALOBI_FILE_DATA = info;
            ABALOBI_FILE_PATH = filepath;
            ABALOBI_FILE_NAME = filename;

            // console.log("STARTING FILE WRITING PROCESS...");
            try {
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(directory) {
                    // console.log("DIR IS: " + directory.name);

                    createDirectory(directory, ABALOBI_FILE_PATH, function(info) {
                            // console.log("INFO" + info);
                            // console.log("ATTEMPTING TO WRITE FILE...");

                            info.getFile(ABALOBI_FILE_NAME, {
                                create: true
                            }, function(file) {
                                // console.log("got the file", file);
                                writeFile(file, ABALOBI_FILE_DATA, true);

                                var popupParams = {
                                        title: 'Settings Saved', // String. The title of the popup.
                                        cssClass: '', // String, The custom CSS class name
                                        subTitle: '', // String (optional). The sub-title of the popup.
                                        template: 'Your settings have been saved!', // String (optional). The html template to place in the popup body.
                                        templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                                        okText: '', // String (default: 'OK'). The text of the OK button.
                                        okType: '', // String (default: 'button-positive'). The type of the OK button.
                                    }
                                    // $ionicPopup.alert(popupParams);
                                    // $state.go("home");
                                // console.log("File Writing complete.");



                            });


                        })
                        // dir.filesystem.root.getDirectory(ABALOBI_FILE_PATH, { create: true }, gotDir);

                });
            } catch (ex) {
                // alert("YOU ARE NOT ON MOBILE!\n" + ex);
                console.log("Browser detected. Unable to write to local storage.");
            }



            function createDirectory(dir, path, success) {
                var dirs = path.split("/").reverse();
                var root = dir.filesystem.root;

                var createDir = function(dir) {
                    // console.log("create dir " + dir);
                    root.getDirectory(dir, {
                        create: true,
                        exclusive: false
                    }, successCB, failCB);
                };

                var successCB = function(entry) {
                    // console.log("dir created " + entry.fullPath);
                    root = entry;
                    if (dirs.length > 0) {
                        createDir(dirs.pop());
                    } else {
                        // console.log("all dir created");
                        success(entry);
                    }
                };

                var failCB = function() {
                    // console.log("failed to create dir " + dir);
                };

                createDir(dirs.pop());

            }

            function writeFile(fileEntry, dataObj, isAppend) {
                // console.log("TRIGGERING WRITEFILE...");

                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter(function(fileWriter) {

                    fileWriter.onwriteend = function() {
                        // console.log("Successful file read...");
                        // readFile(fileEntry);
                    };

                    fileWriter.onerror = function(e) {
                        // console.log("Failed file read: " + e.toString());
                    };

                    // If we are appending data to file, go to the end of the file.
                    if (isAppend) {
                        try {
                            // fileWriter.seek(fileWriter.length);
                        } catch (e) {
                            // console.log("file doesn't exist!");
                        }
                    }
                    var blob = new Blob([dataObj], { type: mime_type });
                    fileWriter.write(blob);


                    // fileWriter.write(dataObj);
                });
            }

        } //End of file writer 

    this.readSettingsFile = function(callback, error) {

            //Config Variables
            // ABALOBI_FILE_DATA = info;
            ABALOBI_FILE_PATH = "abalobi/fisherlauncher";
            ABALOBI_FILE_NAME = "settings.json";
            var jsonFromFile = "";

            // console.log("STARTING FILE READING PROCESS...");
            try {
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + ABALOBI_FILE_PATH + "/" + ABALOBI_FILE_NAME, function(fileEntry) {
                    // console.log("DIR IS: " + directory.name);
                    // dir.filesystem.root.getDirectory(ABALOBI_FILE_PATH, { create: true }, gotDir);

                    fileEntry.file(function(file) {
                        var reader = new FileReader();

                        reader.onloadend = function(e) {
                            console.log("FILE WAS READ SUCCESSFULY.");
                            console.log("Text is: " + this.result);
                            // document.querySelector("#textArea").innerHTML = this.result;
                            jsonFromFile = JSON.parse(this.result);
                            // alert(JSON.stringify(jsonFromFile));
                            callback(jsonFromFile);
                        }

                        reader.readAsText(file);

                    });
                });
            } catch (ex) {
                // alert("NO SETTINGS FOUND!!\n" + ex);
                console.log("File reading failed!\n\n" + ex);
                error();

            }

        } //End of file writer 
})

.service('appState', function($ionicPopup, $state, $translate, fileStorage) {
    var currentAppState = {};
    var currentService = this;
    var gotSettingsFromFile = false;

    //This is the 'init' method, gets called
    //once as the app loads. Determines the 
    //initial language to use.
    this.determineLanguage = function() {
        //Read from file
        try {
            currentService.readLanguageFromFile();

        } catch (ex) {
            // alert("Setting language manually: " + ex);
            currentAppState.language = 'en';
            $translate.use(currentAppState.language);
        }

        //If file exists, language is set from file

        //Else, language is en
    }


    this.readLanguageFromFile = function() {
        //If we've already read the settings, skip this.
        // console.log("Got settings from file? : " + gotSettingsFromFile);
        //Otherwise, read in the settings.
        if (!gotSettingsFromFile) {
            console.log("Running initial read.");
            fileStorage.readSettingsFile(function(jsonFromFile) {
                //Only run once, when the app launches.
                currentAppState = jsonFromFile;
                $translate.use(currentAppState.language);
                gotSettingsFromFile = true;
            }, function() {
                console.log("File reading failed. Falling back to default language.");
                gotSettingsFromFile = true;
                currentAppState.language = 'en';
                $translate.use(currentAppState.language);
            });
        } else {
            // console.log("Skipping read.");
        }
    }



    //Use this for debugging purposes
    this.getAppState = function() {
        return currentAppState;
    }

    this.setLanguage = function(input) {
        //If the language is a proper choice,
        if (input == "en" || input == "afr") {

            //Set the language
            console.log("SETTING LANGUAGE TO " + input);
            currentAppState.language = input;
            $translate.use(currentAppState.language);

            //Now, save the language choice to file.
            fileStorage.writeFileCustom("settings.json", "abalobi/fisherlauncher", JSON.stringify(currentAppState, null, 4), "application/json");

        } else {
            //OOPS!
            console.log("INVALID LANGUAGE: " + input);
        }
    }
    this.getLanguage = function() {
        return currentAppState.language;
    }

})
