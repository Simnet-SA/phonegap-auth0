## Dependencies
- cordova-plugin-safariviewcontroller
- cordova-plugin-customurlscheme (properly configured)

## Implement
"safariview.js" to your app to handle the custom URL scheme callback <br>
Properly configure all your URLs in auth0.js before using (fork the repository for more ease) <br>
Add your allowed callbacks URLs in your Auth0 account

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
 auth0.login({connection:'YOUR_CONNECTION_NAME',scope:"YOUR SCOPES"})
 ```
Result is stored in
```
 localStorage.getItem('auth0User');
 ```
