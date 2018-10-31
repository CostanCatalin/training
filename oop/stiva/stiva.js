let Stiva = (function StivaConfig() {
    let array = [];
    let limit;

    function Stiva(stack_limit = 100) {
        limit = stack_limit < 1 ? 1 : stack_limit;

        Object.defineProperty(this, 'limit', {
            get() {
                return limit;
            },
            set(val) {
                if (isNaN(limit) || val <= 0) {
                    console.log("%cLimit must be a number greater than 0", "color: red;");
                } else if (array.length > val) {
                    console.log("%cStack has more elements than the limit", "color: red;");
                } else {
                    limit = val;
                }
            }
        });    
    }

    Object.assign(Stiva.prototype, {
        push: function(item) {
            if (array.length >= limit) {
                console.log("%cLimit reached", "color: red;");
                return false;
            }

            array.unshift(item);
            return array.length;
        },

        top: function() {
            if (array.length == 0) {
                console.log("%cStack is empty", "color: red;");
                return false;
            }

            return array[0];
        },

        pop: function() {
            if (array.length == 0) {
                console.log("%cStack is empty", "color: red;");
                return false;
            }

            let value = array[0];
            array.splice(0, 1);
            return value;
        },

        is_empty: function() {
            return array.length == 0 ;
        },

        is_full: function() {
            return array.length == limit;
        },

        get_size: function() {
            return array.length;
        },
        
        clear: function() {
            array = [];
        }
    });

    return Stiva;
})();

module.exports = Stiva;
