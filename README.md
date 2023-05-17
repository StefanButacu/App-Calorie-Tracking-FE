ionic build 

npx cap add android
npx cap open android

add    
android:usesCleartextTraffic="true" to <application 

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
TODO - try with 
<br> ionic capacitor add android
<br> ionic capacitor copy android
<br> ionic capacitor run android -l --external
