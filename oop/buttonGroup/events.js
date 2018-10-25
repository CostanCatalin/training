let addEvents = (function setEvents() {
    function EventTarget(){
    }
  
    EventTarget.prototype = {
        constructor: EventTarget,
  
        addListener: function(type, listener){
  
            // create an array if it doesn't exist
            if (!this.hasOwnProperty("_listeners")) {
                this._listeners = [];
            }
  
            if (typeof this._listeners[type] == "undefined"){
                this._listeners[type] = [];
            }
  
            this._listeners[type].push(listener);
        },
        fire: function(event){
  
            if (!event.target){
                event.target = this;
            }
  
            if (!event.type){ // falsy
                throw new Error("Event object missing 'type' property.");
            }
  
            if (this._listeners && this._listeners[event.type] instanceof Array){
                var listeners = this._listeners[event.type];
                for (var i=0, len=listeners.length; i < len; i++){
                    listeners[i].call(this, event);
                }
            }
        },
        removeListener: function(type, listener){
            if (this._listeners && this._listeners[type] instanceof Array){
                var listeners = this._listeners[type];
                for (var i=0, len=listeners.length; i < len; i++){
                     if (listeners[i] === listener){
                         listeners.splice(i, 1);
                         break;
                     }
                }
            }
        }
    };

    let wrapper = document.querySelector('.wrapper');
    var target = new EventTarget();

    function addEvents() {
        wrapper.removeEventListener('click', buttonClicked);
        wrapper.addEventListener('click', buttonClicked);
        target.addListener('message', buttonStateChangedHandler);
    };

    function buttonClicked(e) {
        if (!e.target.classList.contains('group__button') ||
        e.target.parentElement.classList.contains("group--disabled") ||
        e.target.classList.contains('group__button--disabled') ||
        e.target.parentElement.classList.contains("group--checkbox") && e.target.classList.contains('group__button--selected')) {
            return;
        }

        //change state
        target.fire({
            type: 'message',
            data: e.target.getAttribute('related-object-id')
        });
    }

    function buttonStateChangedHandler(e) {
        console.log(e.target + " -- state changed - " + e.data);
        objects.forEach(function(group) {
            group.setSelected(e.data)
        })

    }
   
   addEvents();
})();