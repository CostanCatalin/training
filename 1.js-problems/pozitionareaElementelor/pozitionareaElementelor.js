const pozitionare = (function() {
    let static = document.querySelector(".wrapper-static");
    let absolut = document.querySelector(".wrapper-absolut");

    var TipuriEnum = {"pare":1, "diagPrincipala":2, "deasupraDiagPrincipala":3, "deasupraDiagSecundara": 4, "sah": 5};
    Object.freeze(TipuriEnum);

    function init() {
        var sheet = document.createElement('style');
        sheet.innerHTML = ".element {width:" + latime + "px; height:" + inaltime + "px; }" +
        ".wrapper-static .element {margin-bottom:" + spatiuOrizontal + "px;margin-right:" + spatiuVertical + "px;}" +
        ".wrapper-absolut .element {top:" + spatiuOrizontal + "px;left:" + spatiuVertical + "px;}";
        document.body.appendChild(sheet);

        if (static.childElementCount <= 1) {
            Matrice(TipuriEnum.pare, true);
            Matrice(TipuriEnum.diagPrincipala, true);
            Matrice(TipuriEnum.deasupraDiagPrincipala, true);
            Matrice(TipuriEnum.deasupraDiagSecundara, true);
            Matrice(TipuriEnum.sah, true);
        }

        if (absolut.childElementCount <= 1) {
            Matrice(TipuriEnum.pare, false);
            Matrice(TipuriEnum.diagPrincipala, false);
            Matrice(TipuriEnum.deasupraDiagPrincipala, false);
            Matrice(TipuriEnum.deasupraDiagSecundara, false);
            Matrice(TipuriEnum.sah, false);
        }
    }

    function Matrice(tip, statica) {
        let matrice = document.createElement("div");
        matrice.classList.add("matrice");
        matrice.style.minHeight = linii * inaltime + linii * spatiuOrizontal + "px";
        matrice.style.minWidth = coloane * latime + coloane * spatiuVertical + "px";

        for (let i = 0; i < linii; i++) {
            let row = document.createElement("div");
            row.classList.add("row");

            for (let j = 0; j < coloane; j++) {
                let element = document.createElement("div");
                element.classList.add("element");

                if (!statica) {
                    element.style.left = j * latime + j * spatiuVertical + "px";
                    element.style.top = i * inaltime + i * spatiuOrizontal + "px";
                }
                
                switch(tip) {
                    case TipuriEnum.pare:
                        if (i % 2 == 1) {
                            element.classList.add("different");
                        }
                        break;
                    case TipuriEnum.diagPrincipala:
                        if (i == j) {
                            element.classList.add("different");
                        }
                        break;
                    case TipuriEnum.deasupraDiagPrincipala:
                        if (i < j) {
                            element.classList.add("different");
                        }
                        break;
                    case TipuriEnum.deasupraDiagSecundara:
                        if (j < coloane - i - 1) {
                            element.classList.add("different");
                        }
                        break;
                    case TipuriEnum.sah:
                        if (i % 2 == j % 2) {
                            element.classList.add("different");
                        }
                        break;
                }

                row.append(element);
            }
            matrice.append(row);
        }

        if (statica) {
            static.append(matrice);
        } else {
            absolut.append(matrice);
        }
    }

    return init;
})();