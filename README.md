## React Native Sample App for Mobile Foundation 

### Setup the pre-requisites 
See https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/reactnative-tutorials/ 


### Run the app 

1. Clone the repository 

```
git clone https://github.com/MobileFirst-Platform-Developer-Center/ReactNativeWallet.git
cd react-native-sample/app
```

2. Install all NPM modules 

```
npm install
```

3. Link native libraries 

```
react-native link 
```

4. Register the app 
```
cd android
mfpdev app register
cd ../ios
mfpdev app register
```

5. Deploy the adapters
Upload the `UserLogin.adapter` and `ResourceAdapter.adapter` to the Mobile Foundation console. 

6. Run the app

```
react-native run-android
``` 
OR
```
react-native run-ios
```
