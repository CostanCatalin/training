const DoughnutCombined = (function initializeDoughnutCombined(input) {
    const chartSize = 300;
    const donnutWidth = 35;

    function DoughnutCombined(input) {
        Circle.call(this, input, chartSize);
    }

    DoughnutCombined.prototype = Object.create(Circle.prototype);
    DoughnutCombined.prototype.constructor = DoughnutCombined;

    Object.assign(DoughnutCombined.prototype, {
        draw: function() {
            return Circle.prototype.draw.call(this, donnutWidth);
        }
    })
   
    return DoughnutCombined;
})();