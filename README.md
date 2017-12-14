# Abalobi Fisher

Abalobi Fisher is a "menu" app build in Ionic 1 / Angular 1, for launching
other apps in the Abalobi Suite. We use this app as an easy way for fishers
to access different functionality across the Abalobi system in one convenient 
place.

### Getting Started 

Clone the repo, install dependencies

    $ git clone https://github.com/AbalobiSA/fisher-launcher.git
    $ cd fisher-launcher
    $ npm install -g bower 
    $ bower install 
    $ yarn

Install android

    $ cordova platform add android --save

Install required cordova plugins:


    $ ionic plugin add https://github.com/Initsogar/cordova-webintent
    $ cordova plugin add https://github.com/mwaylabs/cordova-webintent.git
    $ cordova plugin add cordova-plugin-inappbrowser
    $ cordova plugin add com.lampa.startapp
    $ ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git
    $ cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
    $ cordova plugin add cordova-plugin-java7
    $ cordova plugin add cordova-plugin-file
    $ cordova plugin add cordova-plugin-compat
    $ cordova plugin add https://github.com/nova-web-dev/abalobi-odk-configurator.git

    
Launch in browser:

    $ ionic serve 

**To check plugins installed (should list above plugins):**
```
cordova plugins ls
```
**To deploy app to phone or emulator**
```
ionic run android
```
**To deploy to browser**
```
ionic serve
```
---
**Translations files**

See ```www\data\locale-*.json```
