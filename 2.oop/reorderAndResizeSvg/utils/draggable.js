let Draggable = (function initializeDraggable() {

    function Draggable() {
        this.mouseDownHandlerWithContext = mouseDownHandler.bind(this);
        this.mouseMoveHandlerWithContext = mouseMoveHandler.bind(this);
        this.mouseUpHandlerWithContext = mouseUpHandler.bind(this);

        this.element.addEventListener("mousedown", this.mouseDownHandlerWithContext);
    }

    Object.assign(Draggable.prototype, {
        mouseDown: function() {
            throw new Error("mouseDown function not implemented");
        },

        mouseMove: function() {
            throw new Error("mouseMove function not implemented");
        },

        mouseUp: function() {
            throw new Error("mouseUp function not implemented");
        }
    });

    function mouseDownHandler(e) {
        document.body.addEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.addEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.addEventListener("mouseleave", this.mouseUpHandlerWithContext);

        this.mouseDown(e);
    };

    function mouseMoveHandler(e) {
        window.requestAnimationFrame(function() {
            this.mouseMove(e);
        }.bind(this));
    };

    function mouseUpHandler(e) {
        document.body.removeEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.removeEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.removeEventListener("mouseleave", this.mouseUpHandlerWithContext);

        window.setTimeout(function() {
            this.mouseUp(e);
        }.bind(this), 20);
    }

    return Draggable;
})();
