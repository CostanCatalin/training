let resizableMixin = (function initializeResizable(){
    let delta = {
        width: 0,
        height: 0
    };
    let topOffset;
    let resizing = ResizeTypeEnum.None;
    let self;
    let callback;

    let border, handlerT, handlerTR, handlerR, handlerBR, handlerB, handlerBL, handlerL, handlerTL;

    let resizableMixin = {
        drawBorderWithHandlers(resizeFunction) {
            self = this;
            callback = resizeFunction;
            let = wrapper = document.createElementNS(svgNamespace, 'g');
            topOffset = document.querySelector('.list').getBoundingClientRect().top || 0;
            wrapper.classList.add('wrapper');
            wrapper.setAttribute('width', this.width);
            wrapper.setAttribute('height', this.height);
            wrapper.setAttribute('transform', 'translate(-4,-4)');
            wrapper.setAttribute('fill', 'none');
            wrapper.style.stroke = strokeColor;

            border = document.createElementNS(svgNamespace, 'rect');
            border.classList.add('border');
            
            handlerT = document.createElementNS(svgNamespace, 'rect');
            handlerT.classList.add('handler', 'handler-top');

            handlerTR = document.createElementNS(svgNamespace, 'rect');
            handlerTR.classList.add('handler', 'handler-top-right');
    
            handlerR = document.createElementNS(svgNamespace, 'rect');
            handlerR.classList.add('handler', 'handler-right');

            handlerBR = document.createElementNS(svgNamespace, 'rect');
            handlerBR.classList.add('handler', 'handler-bottom-right');

            handlerB = document.createElementNS(svgNamespace, 'rect');
            handlerB.classList.add('handler', 'handler-bottom');
            
            handlerBL = document.createElementNS(svgNamespace, 'rect');
            handlerBL.classList.add('handler', 'handler-bottom-left');
    
            handlerL = document.createElementNS(svgNamespace, 'rect');
            handlerL.classList.add('handler', 'handler-left');

            handlerTL = document.createElementNS(svgNamespace, 'rect');
            handlerTL.classList.add('handler', 'handler-top-left');

            wrapper.addEventListener("mousedown" , mouseDownHandler.bind(this));
            updateResizeHandlers(self);

            wrapper.append(border, handlerT, handlerTR, handlerR, handlerBR, handlerB, handlerBL, handlerL, handlerTL)
            return wrapper;
        },
    };

    
    function updateResizeHandlers(self) {
        let offset = handlerSize / 2;
        border.setAttribute('width', self.width);
        border.setAttribute('height', self.height + padding);
        
        handlerT.setAttribute('x', self.width / 2 + offset - padding);
        handlerT.setAttribute('y', - offset);

        handlerTR.setAttribute('x', self.width - offset);
        handlerTR.setAttribute('y', - offset);

        handlerR.setAttribute('x', self.width - offset);
        handlerR.setAttribute('y', self.height / 2);

        handlerBR.setAttribute('x', self.width - offset);
        handlerBR.setAttribute('y', self.height + offset);
    
        handlerB.setAttribute('x', self.width / 2  + offset - padding);
        handlerB.setAttribute('y', self.height + offset);
        
        handlerBL.setAttribute('x', - offset);
        handlerBL.setAttribute('y', self.height + offset);

        handlerL.setAttribute('x', - offset);
        handlerL.setAttribute('y', self.height / 2);

        handlerTL.setAttribute('x', - offset);
        handlerTL.setAttribute('y', - offset);
    };
    
    function mouseDownHandler(e) {
        if (!e.target.classList.contains('handler')) {
            return;
        }
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
        document.body.addEventListener("mousemove", mouseMoveHandler);
        document.body.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(e) {

        if (resizing == ResizeTypeEnum.Top || resizing == ResizeTypeEnum.Bottom || resizing >= 5) {
            let isBottom = resizing == ResizeTypeEnum.Bottom || resizing == ResizeTypeEnum.BottomLeft || resizing == ResizeTypeEnum.BottomRight;
            let newHeight = !isBottom ? (self.coord.y + self.height) - e.pageY + topOffset : e.pageY - self.coord.y -  topOffset;

            if (newHeight > maxHeight) newHeight = maxHeight;
            if (newHeight < minHeight) newHeight = minHeight;
            
            delta.height = newHeight - self.height;
            if (resizing < 5) {
                delta.width = 0;
            } 
        }

        if (resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.Right || resizing >= 5) {
            let isLeft = resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.TopLeft || resizing == ResizeTypeEnum.BottomLeft;
            let newWidth = isLeft ?  (self.coord.x + self.width) - e.pageX : e.pageX - self.coord.x;

            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;

            delta.width = (newWidth - self.width);
            if (resizing < 5) {
                delta.height = 0;
            } 
        }

        // so that there's no weird shape
        if (self.height + delta.height > self.width + delta.width) {
            return;
        }

        updateResizeHandlers(self);
        callback.call(self, delta, resizing);
    }

    function mouseUpHandler(e) {
        // if isn't an annomaly shape
        if (self.height + delta.height <= self.width + delta.width) {
            callback.call(self, delta, resizing, true);
        }
        resizing = ResizeTypeEnum.None;

        document.body.removeEventListener("mousemove", mouseMoveHandler);
        document.body.removeEventListener("mouseup", mouseUpHandler);
    }

    return resizableMixin;
})();
