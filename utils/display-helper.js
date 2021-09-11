let DisplayHelper = (function helperModule() {
    function Helper() {
        if (!this instanceof Helper) {
            return new Helper();
        }

        this.wrapperClass = "results-wrapper";

        let wrapper = document.querySelector("." + this.wrapperClass);
        if (wrapper === null) {
            wrapper = document.createElement("div");
            wrapper.classList.add(this.wrapperClass);
            document.body.appendChild(wrapper);

            let styleElement = document.createElement("style");
            styleElement.appendChild(document.createTextNode(`
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

            body {
                font-family: Roboto, sans-serif;
            }

            .results-wrapper p {
                background-color: #b2b2b242;
                width: calc(100% - 60px);
                margin: 5px 20px 0 20px;
                padding: 5px 10px;
                border-radius: 2px;
                word-break: break-word;
                text-align: justify;
            }`));

            document.head.appendChild(styleElement);
        }

        this.wrapper = wrapper;
    }

    _beautify = function(item, level) {
        let _level = level || 0;
        if (typeof item === "string") {
            return ".".repeat(_level * 3) + item;
        }

        if (Array.isArray(item)) {
            let arrString = "";
            if (_level === 0) {
                arrString = "\n" + ".".repeat(_level * 3) + ` Array with ${item.length} items:`
            }

            for (let i = 0; i < item.length; i++) {
                if (i === 0) {
                    arrString += "\n" + ".".repeat(_level * 3) + " [";
                }

                arrString += _beautify(item[i], _level + 1);
                
                if (i < item.length - 1) {
                    arrString += ",";
                } else {
                    if (Array.isArray(item[i])) {
                        arrString += "\n";
                    }
                    arrString += "]";
                }
            }
            return arrString;
        } else if (typeof item === "object") {
            let objStr = "{";

            let entries = Object.entries(item);
            for (let i = 0; i < entries.length; i++) {
                let [key, value] = entries[i];
                objStr += "\n" + ".".repeat((_level + 1) * 3) + key + ": " + _beautify(value, 0);

                if (i < entries.length - 1) {
                    objStr += ",";
                } else {
                    objStr += "\n}\n";
                }
            }

            return objStr;
        }

        return item.toString();
    }

    Helper.prototype.display = function(...params) {
        for (let item of params) {
            let elem = document.createElement("p");
            elem.innerText = _beautify(item);
            this.wrapper.appendChild(elem);
        }
    }

    return Helper;
})();
