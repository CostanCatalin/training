let Stiva = (function StivaConfig() {


    function Stiva(stack_limit = 100) {
        this.array = [];
        this.limit = stack_limit < 1 ? 1 : stack_limit; 
    }

    Object.assign(Stiva.prototype, {
        push: function(item) {
            if (this.array.length >= this.limit) {
                console.log("%cLimit reached", "color: red;");
                return false;
            }

            this.array.unshift(item);
            return this.array.length;
        },

        top: function() {
            if (this.array.length == 0) {
                console.log("%cStack is empty", "color: red;");
                return false;
            }

            return this.array[0];
        },

        pop: function() {
            if (this.array.length == 0) {
                console.log("%cStack is empty", "color: red;");
                return false;
            }

            let value = this.array[0];
            this.array.splice(0, 1);
            return value;
        },

        is_empty: function() {
            return this.array.length == 0 ;
        },

        is_full: function() {
            return this.array.length == this.limit;
        },

        get_size: function() {
            return this.array.length;
        },
        
        clear: function() {
            this.array = [];
        }
    });

    return Stiva;
})();

//module.exports = Stiva;
