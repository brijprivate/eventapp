cd..
ionic cordova build android --release
cd BuildActivity
copy "..\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" ".\"
del Cdays.apk
ren app-release-unsigned.apk Cdays.apk
del cadysKeystore.keystore
keytool -genkey -v -keystore cadysKeystore.keystore -alias Cdays -keyalg RSA -keysize 2048 -dname "CN=mqttserver.ibm.com, OU=ID, O=IBM, L=Hursley, S=Hants, C=GB" -validity 10000 -keypass 123456 -storepass 123456
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cadysKeystore.keystore Cdays.apk Cdays -keypass 123456 -storepass 123456
set /p DUMMY=Hit ENTER to continue...


ionic cordova run android -l -c --native-run

cd..
ionic cordova build android --release

------------------------------------------------
ionic cordova build android --prod --release

cmd
cd BuildActivity
del app-release-unsigned.apk
del cadysKeystore.keystore
del Cdays.apk
copy "..\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" ".\"
keytool -genkey -v -keystore cadysKeystore.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias Cdays -dname "CN=mqttserver.ibm.com, OU=ID, O=IBM, L=Hursley, S=Hants, C=GB" -keypass 123456 -storepass 123456
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cadysKeystore.keystore app-release-unsigned.apk Cdays -keypass 123456 -storepass 123456
"C:\Program Files (x86)\Android\android-sdk\build-tools\25.0.3\zipalign.exe" -v 4 app-release-unsigned.apk Cdays.apk
"C:\Program Files (x86)\Android\android-sdk\build-tools\25.0.3\apksigner.bat" verify Cdays.apk
