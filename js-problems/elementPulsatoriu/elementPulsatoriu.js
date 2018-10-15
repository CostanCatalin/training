var elementPulsatoriu = (function elementPulsatoriu() {
    let wrappers = document.querySelectorAll('.wrapper');
    let destCss = document.querySelector('.wrapper-css .pulse');
    let destJs = document.querySelector('.wrapper-js .pulse');
    let jsHelper = document.querySelector('.wrapper-js .pulse .helper');
    let outerPulseJs = document.querySelector('.wrapper-js .outer-pulse');
    var start = null;

    function init() {
        if (dimensiuneMinima >= dimensiuneMaxima) {
            dimensiuneMaxima = dimensiuneMinima;
            dimensiuneMinima = dimensiuneMinima / 2;
        }

        cssVersion();
        jsVersion();
    }

    function cssVersion() {
        destCss.style.width = dimensiuneMinima + "px";
        destCss.style.height = dimensiuneMinima + "px";
        destCss.style.animationDuration = durata + "ms";

        wrappers[0].style.animationDuration = durata + "ms";
        wrappers[0].style.width = dimensiuneMaxima + "px";
        wrappers[0].style.height = dimensiuneMaxima + "px";
    }

    function jsVersion() {
        start = null;
        destJs.style.width = dimensiuneMinima + "px";
        destJs.style.height = dimensiuneMinima + "px";
        jsHelper.style.opacity = 1;

        jsHelper.style.width = 0;
        jsHelper.style.height = 0; 
        outerPulseJs.style.width = 0;
        outerPulseJs.style.height = 0; 

        wrappers[1].style.width = dimensiuneMaxima + "px";
        wrappers[1].style.height = dimensiuneMaxima + "px";

        
        setTimeout(function() {
            window.requestAnimationFrame(jsAnimate);
        }, 200);
    }

    function jsAnimate(timestamp) {
        if (!start) {
            start = timestamp;
        }

        var progress = Math.floor(timestamp - start);
        var sizeInner = Math.min(progress / (durata - 350) * dimensiuneMinima, dimensiuneMinima);
        var sizeOuter = Math.min(progress / (durata - 350) * dimensiuneMaxima, dimensiuneMaxima);
        jsHelper.style.opacity = Math.min((dimensiuneMinima - sizeInner) / dimensiuneMinima, 1);
        jsHelper.style.width = sizeInner + "px"; 
        jsHelper.style.height = sizeInner + "px";

        outerPulseJs.style.opacity = jsHelper.style.opacity;
        outerPulseJs.style.width = sizeOuter + "px"; 
        outerPulseJs.style.height = sizeOuter + "px";
        
        if (sizeInner < dimensiuneMinima - 1) {
            window.requestAnimationFrame(jsAnimate);
        } else {
            jsVersion();
        }
    }

    return init;
})();