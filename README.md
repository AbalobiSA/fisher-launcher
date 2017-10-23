# Abalobi Fisher
Abalobi Fisher - Ionic app for launching ODK / Telegram / Weather etc

    $ git clone https://github.com/AbalobiSA/fisher-launcher.git
    $ cd fisher-launcher
    $ cordova platform add android
    $ bower install ngCordova


Install required plugins:


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
