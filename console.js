class CustomConsol {

    dom = document

    constructor(dom) {
        this.dom = dom
    }

    getTime = () => {
        return new Date().toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    log = (...args) => {
        this.printIt('text-gray-200', ...args);
    }
    error = (...args) => {
        this.printIt('text-red-400', ...args);
    }
    warn = (...args) => {
        this.printIt('text-yellow-300', ...args);
    }
    info = (...args) => {
        this.printIt('text-blue-200', ...args);
    }
    clear = () => {
        this.dom.querySelector('#console-output').innerHTML = '';
    }
    printIt = (className = 'text-yellow-200', ...args) => {
        const time = this.getTime()
        const output = args.map(arg => {

            // Use switch.
            switch (true) {
                case arg === null:
                    return 'null';
                case Array.isArray(arg):
                    return `[${arg.map(item => JSON.stringify(item, null, 2)).join(', ')}]`;
                case arg instanceof Error:
                    return arg.stack || arg.message; // Serialize errors
                case typeof arg === 'function':
                case typeof arg === 'class':
                    return `<span class="text-yellow-300 italic">f</span> ${arg.toString()}`;
                case typeof arg === 'object':
                    return JSON.stringify(arg, null, 2); // Serialize other objects
                // Boolean, Number
                case typeof arg === 'boolean':
                    return `<span class="italic">${arg}</span>`;
                default:
                    // encodes special characters
                    return arg.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

        }).join(' ');
        const container = this.dom.querySelector('#console-output')
        container.innerHTML += `<div class="flex justify-between gap-2 w-full" title="${time}"><div class="${className} flex gap-2 w-full"><div class="text-slate-500 font-light w-3">~</div> <div class="w-full whitespace-pre-wrap">${output}</div></div></div>`;
    }
}

export default CustomConsol;