let config = (function getConfig() {
    return {
        groups: [
            {
                type: 'checkbox',
                disabled: false,
                customStyle: 'display: inline-block; background-color: green;',
                buttons: [
                    {
                        name: 'Button 1',
                        selected: false,
                        disabled: false,
                        customStyle: null
                    },{
                        name: 'Button 2',
                        selected: false,
                        disabled: false,
                        customStyle: null
                    },{
                        name: 'Button 3',
                        selected: false,
                        disabled: false,
                        customStyle: 'border: 2px solid red;'
                    }
                ]
            },
            {
                type: 'button',
                disabled: false,
                customStyle: 'background-color: blue; width: 100px',
                buttons: [
                    {
                        name: 'Button 4',
                        selected: true,
                        disabled: false,
                        customStyle: null
                    },{
                        name: 'Button 5',
                        selected: false,
                        disabled: false,
                        customStyle: null
                    },{
                        name: 'Button 6',
                        selected: false,
                        disabled: true,
                        customStyle: '',
                    }
                ]
            }
        ]
    };
})();