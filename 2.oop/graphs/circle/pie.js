let Pie = (function() {
    const chartSize = 300;

    let Pie = function(input) {
        Circle.call(this, input, chartSize);
    }

    Pie.prototype = Object.create(Circle.prototype);
    Pie.prototype.constructor = Pie;

    return Pie;
})();