let StorageManager = (function storageModule() {
    function StorageManager(itemName, config) {
        this.itemName = itemName;
        this.config = config;
    };

    Object.assign(StorageManager.prototype, {
        get: function() {
            let prevConfig = JSON.parse(window.localStorage.getItem(this.itemName + "_config"));

            if (prevConfig.size != this.config.size || prevConfig.number != this.config.number) {
                return null;
            }
            return JSON.parse(window.localStorage.getItem(this.itemName));
        },
        set: function(value) {
            window.localStorage.setItem(this.itemName, JSON.stringify(value));
            window.localStorage.setItem(this.itemName + "_config", JSON.stringify(this.config));
        },
        clear: function() {
            window.localStorage.removeItem(this.itemName);
        }
    });

    return StorageManager;
})();