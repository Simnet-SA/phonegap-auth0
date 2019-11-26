## Dependencies
- cordova-plugin-safariviewcontroller
- cordova-plugin-customurlscheme

## Implement
"safariview.js" to your app to handle the custom URL scheme callback
Properly configure all your URLs in auth0.js before building (fork the repository for more ease)

## Usage
To install : add the following in your config.xml
```
<plugin name="Auth0Client" value="com.auth0.sdk" spec="https://github.com/Simnet-SA/phonegap-auth0"/>
```
Or if you forked the repo : 
```
<plugin name="Auth0Client" value="com.auth0.sdk" spec="FORKED_REPO_URL"/>
```

Init : 
```javascript
var auth0 = new Auth0Client(
        "YOUR_DOMAIN",
        "YOUR_CLIENT_ID");
 ```
 Prompt login : 
 ```
 auth0.login({connection:'YOUR_CONNECTION_NAME',scope:"openid email user_metadata profile"},function(err,result){})
 ```
Result is stored in
```
 localStorage.getItem('auth0User');
 ```
