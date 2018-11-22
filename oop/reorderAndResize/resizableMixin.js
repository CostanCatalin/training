let resizableMixin = (function initializeResizable(){
    let resizing = ResizeTypeEnum.None;
    let delta = {
        width: 0,
        height: 0
    };
    let self;

    let wrapper;
    let mouseDownHandlerWithContext;

    let resizableMixin = {
        drawBorderWithHandlers() {
            self = this;
            let justCreated = false;
            if (mouseDownHandlerWithContext != null) {
                wrapper.removeEventListener("mousedown", mouseDownHandlerWithContext);
            }
            if (wrapper == null) {
                wrapper = document.createElement('div');
                wrapper.classList.add('border');
                justCreated = true;
            }
            
            wrapper.style.width = this.width + padding / 2 + "px";
            wrapper.style.height = this.height + padding / 2 + "px";

            mouseDownHandlerWithContext = mouseDownHandler.bind(self);

            if (wrapper != null && !justCreated) {
                wrapper.addEventListener("mousedown", mouseDownHandlerWithContext);
                return wrapper;
            }

            let handlerT = document.createElement('div');
            handlerT.classList.add('handler', 'handler-top');
            handlerT.append(document.createElement('div'));

            let handlerTR = document.createElement('div');
            handlerTR.classList.add('handler', 'handler-top-right');
            handlerTR.append(document.createElement('div'));
    
            let handlerR = document.createElement('div');
            handlerR.classList.add('handler', 'handler-right');
            handlerR.append(document.createElement('div'));

            let handlerBR = document.createElement('div');
            handlerBR.classList.add('handler', 'handler-bottom-right');
            handlerBR.append(document.createElement('div'));

            let handlerB = document.createElement('div');
            handlerB.classList.add('handler', 'handler-bottom');
            handlerB.append(document.createElement('div'));
            
            let handlerBL = document.createElement('div');
            handlerBL.classList.add('handler', 'handler-bottom-left');
            handlerBL.append(document.createElement('div'));
    
            let handlerL = document.createElement('div');
            handlerL.classList.add('handler', 'handler-left');
            handlerL.append(document.createElement('div'));

            let handlerTL = document.createElement('div');
            handlerTL.classList.add('handler', 'handler-top-left');
            handlerTL.append(document.createElement('div'));

            wrapper.addEventListener("mousedown" , mouseDownHandlerWithContext);

            wrapper.append(handlerT, handlerTR, handlerR, handlerBR, handlerB, handlerBL, handlerL, handlerTL)
            return wrapper;
        }
    };
    
    function mouseDownHandler(e) {
        if (e.target.classList.contains('handler-top')) {
            resizing =  ResizeTypeEnum.Top;

        } else if (e.target.classList.contains('handler-right')) {
            resizing =  ResizeTypeEnum.Right;

        } else if (e.target.classList.contains('handler-bottom')) {
            resizing =  ResizeTypeEnum.Bottom;

        } else if (e.target.classList.contains('handler-left')) {
            resizing =  ResizeTypeEnum.Left;

        } else if (e.target.classList.contains('handler-top-right')) {
            resizing =  ResizeTypeEnum.TopRight;

        } else if (e.target.classList.contains('handler-top-left')) {
            resizing =  ResizeTypeEnum.TopLeft;

        } else if (e.target.classList.contains('handler-bottom-right')) {
            resizing =  ResizeTypeEnum.BottomRight;
            
        } else if (e.target.classList.contains('handler-bottom-left')) {
            resizing =  ResizeTypeEnum.BottomLeft;
        }
        self = this;
        delta.width = 0; 
        delta.height = 0;

        document.body.addEventListener("mousemove", mouseMoveHandler);
        document.body.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(e) {
        let rect = self.element.querySelector('.item').getBoundingClientRect();

        if (resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.Right || resizing >= 5) {
            let isLeft = resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.TopLeft || resizing == ResizeTypeEnum.BottomLeft;
            let newWidth = isLeft ? rect.right - e.pageX : e.pageX - self.left;

            if (newWidth < minWidth) {
                newWidth = minWidth;
            }
            if (newWidth > maxWidth) {
                newWidth = maxWidth;
            }

            delta.width = newWidth - self.width;
        }

        if (resizing == ResizeTypeEnum.Top || resizing == ResizeTypeEnum.Bottom || resizing >= 5) {
            let isBottom = resizing == ResizeTypeEnum.Bottom || resizing == ResizeTypeEnum.BottomLeft || resizing == ResizeTypeEnum.BottomRight;
            let newHeight = !isBottom ? rect.bottom - e.pageY : e.pageY - rect.top;

            if (newHeight > maxHeight) {
                newHeight = maxHeight;
            }
            if (newHeight < minHeight) {
                newHeight = minHeight;
            }

            delta.height = newHeight - self.height;
        }

        if (delta.height != 0 || delta.width != 0) {
            self.resize(delta, resizing);
        }
    }

    function mouseUpHandler(e) {
        self.resize(delta, resizing, true);
        resizing = ResizeTypeEnum.None;

        document.body.removeEventListener("mousemove", mouseMoveHandler);
        document.body.removeEventListener("mouseup", mouseUpHandler);
    }

    return resizableMixin;
})();
