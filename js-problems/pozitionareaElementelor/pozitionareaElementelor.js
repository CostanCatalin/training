const pozitionare = (function() {
    let dest = document.querySelector(".wrapper-static");

    var TipuriEnum = {"pare":1, "diagPrincipala":2, "deasupraDiagPrincipala":3, "deasupraDiagSecundara": 4, "sah": 5};
    Object.freeze(TipuriEnum);

    function init() {
        var sheet = document.createElement('style');
        sheet.innerHTML = ".element {width:" + latime + "px; height:" + inaltime + "px;"
            + "margin-bottom:" + spatiuOrizontal + "px;margin-right:" + spatiuVertical + "px;"
        + "}";
        document.body.appendChild(sheet);

        if (dest.childElementCount <= 1) {
            MatriceStatica(TipuriEnum.pare);
            MatriceStatica(TipuriEnum.diagPrincipala);
            MatriceStatica(TipuriEnum.deasupraDiagPrincipala);
            MatriceStatica(TipuriEnum.deasupraDiagSecundara);
            MatriceStatica(TipuriEnum.sah);
        }
    }

    function MatriceStatica(tip) {
        let matriceaAsta = document.createElement("div");
        matriceaAsta.classList.add("matrice");

        for (let i = 0; i < linii; i++) {
            let row = document.createElement("div");
            row.classList.add("row");

            for (let j = 0; j < coloane; j++) {
                let element = document.createElement("div");
                element.classList.add("element");
                
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
            matriceaAsta.append(row);
        }

        dest.append(matriceaAsta);
    }

    return init;
})();