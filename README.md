# Skelton

## Android build setting update

build.grade
```
...
buildscript {
    ext {
        ...
        minSdkVersion = 21
        ...
    }
...
}
```

## Font

### IOS

Info.plist

```xml
<key>UIAppFonts</key>
	<array>
		<string>Foundation.ttf</string>
		<string>MaterialCommunityIcons.ttf</string>
		<string>MaterialIcons.ttf</string>
		<string>Ionicons.ttf</string>
		<string>AntDesign.ttf</string>
		<string>FontAwesome.ttf</string>
	</array>
```

## Appcenter

appcenter 需要增加幾行程式碼

[add sdk step](https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#33-ios-only-integrate-the-ios-sdk-manually-without-react-native-link-or-cocoapods)

 ## 需要增加檔案

 ### IOS

 AppCenter-Config.plist

 ```xml
 <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    <key>AppSecret</key>
    <string>APP_SCRECT</string>
    </dict>
</plist>
 ```

### Android

android/app/src/main/assets/appcenter-config.json

```json
{
  "app_secret": "54335d0d-cb1f-46d5-b4ec-2e59f3c3b810"
}
```

res/values/strings.xml 

```xml
<string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
<string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
```

https://appcenter.ms/users/${account}/apps/${project}

## Flipper

[redux-devtool](https://github.com/jk-gan/redux-flipper)

## Trouble 

[打包錯誤 library-not-found-for-lpods](https://stackoverflow.com/questions/23539147/xcode-ld-library-not-found-for-lpods?lq=1)