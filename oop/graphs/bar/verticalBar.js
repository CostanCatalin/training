let VerticalBar = (function initializeVerticalBar() {
    const width = 35;
    const height = 650;

    function VerticalBar(input) {
        Bar.call(this, input, width, height, true);
    }

    VerticalBar.prototype = Object.create(Bar.prototype);
    VerticalBar.prototype.constructor = VerticalBar;

    return VerticalBar;
})();