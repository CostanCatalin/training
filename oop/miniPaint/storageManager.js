let StorageManager = (function storageModule() {
    function StorageManager(itemName) {
        this.itemName = itemName;
    };

    Object.assign(StorageManager.prototype, {
        get: function() {
            return JSON.parse(window.localStorage.getItem(this.itemName));
        },
        set: function(value) {
            window.localStorage.setItem(this.itemName, JSON.stringify(value));
        },
        clear: function() {
            window.localStorage.removeItem(this.itemName);
        }
    });

    return StorageManager;
})();