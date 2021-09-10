let CustomEventTarget = (function setEvents() {
    let _listeners = [];

    function CustomEventTarget(){
    }
  
    CustomEventTarget.prototype = {
        constructor: CustomEventTarget,
  
        addListener: function(type, listener){
  
            if (typeof _listeners[type] == "undefined"){
                _listeners[type] = [];
            }
  
            _listeners[type].push(listener);
        },
        fire: function(event){
  
            if (!event.target){
                event.target = this;
            }
  
            if (!event.type){ // falsy
                throw new Error("Event object missing 'type' property.");
            }
  
            if (_listeners && _listeners[event.type] instanceof Array){
                var listeners = _listeners[event.type];
                for (var i=0, len=listeners.length; i < len; i++){
                    listeners[i].call(this, event);
                }
            }
        },
        removeListener: function(type, listener){
            if (_listeners && _listeners[type] instanceof Array){
                var listeners = _listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                    if (listeners[i] === listener){
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
   
   return CustomEventTarget;
})();