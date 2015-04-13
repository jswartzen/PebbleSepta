// Constructor for the config object.
var Config = function(callback) {
    var self = this;
    
    // Set some defaults
    this.home = 'Swarthmore';
    this.work = 'Suburban Station';
    this.freq = 1;
    
    // Initialize from local storage
    for (var i = 0; i < localStorage.length; i++) {
        var prop = localStorage.key(i);
        this[prop] = localStorage.getItem(prop);
        console.log("Retrieved " + prop + " from storage: " + this[prop]);
    }
    
    // Set up Configuration event handlers
    Pebble.addEventListener('showConfiguration', function() {
        var options = {
            home: self.home,
            work: self.work,
            freq: self.freq
        };
        var configUrl = 'https://dl.dropboxusercontent.com/s/sc0n8zq03sgrbxk/Config.html?'+encodeURIComponent(JSON.stringify(options));
        console.log('Settings requested from ' + configUrl);
        Pebble.openURL(configUrl);
    });

    Pebble.addEventListener("webviewclosed", function(e) {
        var options, changed;
        console.log("configuration closed");

        // webview closed
        if (e.response && e.response.charAt(0) == "{" && e.response.slice(-1) == "}" && e.response.length > 5) {
            options = JSON.parse(decodeURIComponent(e.response));
            console.log("Options = " + JSON.stringify(options));
            
            // Copy option values to our object and store them in local storage
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) {
                    if (options[prop] != self[prop]) {
                        console.log("Adding " + prop + " to storage: " + options[prop]);
                        changed = true;
                        localStorage[prop] = self[prop] = options[prop];
                     }
                }
            }        

            if (changed) {
                callback(self);
            }
            
        } else {
            console.log("Config Cancelled");
        }
    });
};

this.exports = Config;