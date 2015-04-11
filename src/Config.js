var options = {
    home: 'Swarthmore',
    work: 'Suburban Station'
};

this.exports = {
    // callback function will have two parameters -- home and work
    init: function (callback) {
        Pebble.addEventListener('showConfiguration', function() {
            var configUrl = 'https://dl.dropboxusercontent.com/s/sc0n8zq03sgrbxk/Config.html?'+encodeURIComponent(JSON.stringify(options));
            console.log('Settings requested from ' + configUrl);
            Pebble.openURL(configUrl);
        });
            
        Pebble.addEventListener("webviewclosed", function(e) {
            console.log("configuration closed");
            
            // webview closed
            if (e.response && e.response.charAt(0) == "{" && e.response.slice(-1) == "}" && e.response.length > 5) {
                options = JSON.parse(decodeURIComponent(e.response));
                console.log("Options = " + JSON.stringify(options));
            } else {
                console.log("Config Cancelled");
            }
        }); 
    }
};