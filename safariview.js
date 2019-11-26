function openUrl(url, readerMode) {
    SafariViewController.isAvailable(function (available) {
      if (available) {
        SafariViewController.show({
              url: url,
              hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
              animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
              transition: 'slide', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
              enterReaderModeIfAvailable: readerMode, // default false
            //   tintColor: "#3b3b3b", // default is ios blue
              barColor: "#3b3b3b", // on iOS 10+ you can change the background color as well
              controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
            },
            // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
            function(result) {
              if (result.event === 'opened') {
                console.log('opened');
              } else if (result.event === 'loaded') {
                console.log('loaded');
              } else if (result.event === 'closed') {
                console.log('closed');
              }
            },
            function(msg) {
              console.log("KO: " + msg);
            })
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        return window.open(url, '_blank', 'location=yes');
      }
    })
}
  
function dismissSafari() {
    SafariViewController.hide();
}


//url scheme handle

function handleOpenURL(url) {
    setTimeout(function() {
        dismissSafari();

        console.log("received url: " + url);
    
        var result = cparseResult(url);
        cdone(null,result);
    }, 5);
}
  

//Methods from Auth0Client.js 


function callback(err,auth0User){
    if(err) console.log("error");
}
function cparseResult(result) {
    var tokens = {};
    var strTokens = result.split("#")[1].split("&");
    for (var i in strTokens) {
        var tok = strTokens[i].split("=");
        tokens[tok[0]] = tok[1];
    }
    return tokens;
};

function cdone(err, result) {
    if (err) {console.log(err);return false;}

    var userInfoEndpoint = auth0.get("UserInfoEndpoint");
    userInfoEndpoint = userInfoEndpoint.replace(/{domain}/, auth0.get("domain"));
    var endpoint = userInfoEndpoint + result.access_token;
    

    cgetUserInfo(endpoint, function (err, profile) {
      if (err) {console.log(err); return false;}
      
      var auth0User = {
        auth0AccessToken: result.access_token,
        idToken: result.id_token,
        profile: profile
      };

      // persist user
      localStorage.setItem('auth0User', JSON.stringify(auth0User));
      loginFromProfile();
      if(callback) callback(null, auth0User);
    });
};

function cgetUserInfo(endpoint, callback) {
    $.ajax({
        url: endpoint,
        dataType: 'json'
    })
    .done(function (profile) {
        callback(null, profile);
    })
    .fail(function (resp) {
        callback(new Error(resp.responseText));
    });
};

