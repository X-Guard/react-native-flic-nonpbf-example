# Setup iOS

To setup the Flic react-native module you need to follow some manual steps:

- (Download the fliclib SDK for iOS)[https://github.com/50ButtonsEach/fliclib-ios]
- Follow the steps 1 to 4 from (the Flic iOS tutorial)[https://partners.flic.io/partners/developers/ios-tutorial]
- Add the following to your `Info.plist` file. (`ios/<yourApp>/Info.plist`)

```
	<key>UIBackgroundModes</key>
	<array>
		<string>bluetooth-central</string>
	</array>
	<key>NSLocationAlwaysUsageDescription</key>
	<string>Better use of bluetooth</string>
	<key>NSLocationUsageDescription</key>
	<string>Better use of bluetooth</string>
	<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>flic20</string>
	</array>
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>YOUR_APP_NAME</string>
			</array>
		</dict>
	</array>
```

- _Make sure you change `YOUR_APP_NAME` in `CFBundleURLSchemes`_
- Run `npm install react-native-flic-nonpbf`
- Run `react-native link react-native-flic-nonpbf` if you did not do so already. 

Flic should now be ready to use in your app.

For implementation details please refer to the example.