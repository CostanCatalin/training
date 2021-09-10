(function main() {
    let dest = document.querySelector('body .controls');

    function init() {

        for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
            let group = groups[groupIdx];

            group.addListener("message", function(e) {
                group.setSelected.call(group, parseInt(e.data));
            });

            dest.append(group.element);
        };
    }

    init();
})();