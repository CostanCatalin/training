let Resizable = (function initializeResizable() {

    function Resizable() {
        ResizeControls.call(this);
    }

    Object.assign(Resizable.prototype, ResizeControls.prototype);

    Object.assign(Resizable.prototype, {
        resize: function() {
            throw new Error("Resize function not implemented");
        }
    });

    return Resizable;
})();
