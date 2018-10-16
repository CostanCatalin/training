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

    function setSizeBoundries(elem) {
        elem.style.minWidth = dimensiuneMinima + "px";
        elem.style.minHeight = dimensiuneMinima + "px";
        
        elem.style.maxWidth = dimensiuneMaxima + "px";
        elem.style.maxHeight = dimensiuneMaxima + "px";
    }

    function cssVersion() {
        setSizeBoundries(destCss);
        destCss.style.animationDuration = durata + "ms";

        wrappers[0].style.animationDuration = durata + "ms";
        wrappers[0].style.width = dimensiuneMaxima + "px";
        wrappers[0].style.height = dimensiuneMaxima + "px";
    }

    function jsVersion() {
        start = null;
        setSizeBoundries(destJs);
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

        var progress = (timestamp - start) / (durata - 350);
        var sizeInner = Math.min(progress * dimensiuneMinima, dimensiuneMinima);
        var sizeOuter = Math.min(progress * dimensiuneMaxima, dimensiuneMaxima);
        var size = Math.min(Math.abs(Math.sin(progress * 10 / Math.PI)) * dimensiuneMaxima, dimensiuneMaxima);
        
        jsHelper.style.opacity = Math.min((dimensiuneMinima - sizeInner) / dimensiuneMinima, 1);
        jsHelper.style.width = sizeInner + "px"; 
        jsHelper.style.height = sizeInner + "px";
        
        destJs.style.height = size + "px";
        destJs.style.width = size + "px";

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