@echo off
rem echo Creating release build...
rem START /wait cordova build --release
echo Creating Directory...
mkdir apk && echo Directory Created! || echo Directory 'APK' exists!
xcopy /y .\platforms\android\build\outputs\apk\com.abalobi_fisher.apk .\apk || echo Copying Failed!
echo Done!




