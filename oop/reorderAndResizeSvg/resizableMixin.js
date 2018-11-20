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
            window.requestAnimationFrame(updateResizeHandlers.bind(this));

            wrapper.append(border, handlerT, handlerTR, handlerR, handlerB, handlerBL, handlerBR, handlerL, handlerTL)
            return wrapper;
        },
    };

    
    function updateResizeHandlers() {
        const offset = handlerSize / 2;
        const widthWithPadding = this.width + padding;

        border.setAttribute('width', widthWithPadding);
        border.setAttribute('height', this.height + padding);
        
        handlerT.setAttribute('x', widthWithPadding / 2 + offset - padding);
        handlerT.setAttribute('y', - offset);

        handlerTR.setAttribute('x', widthWithPadding - offset);
        handlerTR.setAttribute('y', - offset);

        handlerR.setAttribute('x', widthWithPadding - offset);
        handlerR.setAttribute('y', this.height / 2);

        handlerBR.setAttribute('x', widthWithPadding - offset);
        handlerBR.setAttribute('y', this.height + offset);
    
        handlerB.setAttribute('x', widthWithPadding / 2  + offset - padding);
        handlerB.setAttribute('y', this.height + offset);
        
        handlerBL.setAttribute('x', - offset);
        handlerBL.setAttribute('y', this.height + offset);

        handlerL.setAttribute('x', - offset);
        handlerL.setAttribute('y', this.height / 2);

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

        window.requestAnimationFrame(updateResizeHandlers.bind(self));
        callback.call(self, delta, resizing);
    }

    function mouseUpHandler(e) {
        callback.call(self, delta, resizing, true);
        resizing = ResizeTypeEnum.None;

        document.body.removeEventListener("mousemove", mouseMoveHandler);
        document.body.removeEventListener("mouseup", mouseUpHandler);
    }

    return resizableMixin;
})();
