## Usage
To install : add the following in your config.xml
<plugin name="Auth0Client" value="com.auth0.sdk" spec="https://github.com/Simnet-SA/phonegap-auth0"/>

Dependencies : cordova-plugin-safariviewcontroller and cordova-plugin-customurlscheme

Init : 
var auth0 = new Auth0Client(
        "YOUR_DOMAIN",
        "YOUR_CLIENT_ID");
