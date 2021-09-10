let HorizontalBar = (function initializeHorizontalBar() {
    const width = 650;
    const height = 35;

    function HorizontalBar(input) {
        Bar.call(this, input, width, height, false);
    }

    HorizontalBar.prototype = Object.create(Bar.prototype);
    HorizontalBar.prototype.constructor = HorizontalBar;

    return HorizontalBar;
})();