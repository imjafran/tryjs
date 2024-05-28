import CustomConsole from './console.js';
import randomSnippet from './snippets.js';

class TryJS {

    editor = null;

    static init() {
        const self = new TryJS();
        window.__customConsole = new CustomConsole(document);
        self.init();
    }

    $(selector) {
        return document.querySelector(selector);
    }

    $$(selector) {
        return document.querySelectorAll(selector);
    }

    init() {
        this.initCodeMirror()
        this.editor.setValue(randomSnippet.getSnippet());
        this.initEvents()
    }

    initCodeMirror() {
        // Initialize CodeMirror editor
        this.editor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            placeholder: 'Enter JavaScript',
            fontSize: 16,
        });
        this.editor.setSize('100%', '100%');
    }

    toggleHelp() {
        this.$('#help-modal').classList.toggle('hidden');
    }

    toggleDocument(){
        this.$('#document-frame').classList.toggle('hidden');
    }

    initEvents() {
        this.$('#run-button').addEventListener('click', this.runCode.bind(this));
        this.$('#clear-console').addEventListener('click', this.clearConsole.bind(this));
        this.$('#help-button').addEventListener('click', this.toggleHelp.bind(this));
        this.$('#close-document').addEventListener('click', this.toggleDocument.bind(this));
        this.$$('.close-help').forEach(el => {
            el.addEventListener('click', () => this.toggleHelp(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.toggleHelp(false);
                this.runCode();
            }

            // On Esc key press, close the help modal.
            if (e.key === 'Escape') {
                this.$('#help-modal').classList.add('hidden');
            }

            // On Ctrl + H, open the help modal.
            if (e.key === 'h' && e.ctrlKey) {
                this.toggleHelp();
            }

            // On Ctrl + R, run the code.
            if (e.key === 'r' && e.ctrlKey) {
                this.runCode();
            }

            // On Ctrl + C, clear the console.
            if (e.key === 'c' && e.ctrlKey) {
                this.clearConsole();
            }

            // On Ctr + N, clear the editor.
            if (e.key === 'n' && e.ctrlKey) {
                this.editor.setValue('');
            }

            // On Ctrl + D, show the document.
            if (e.key === 'd' && e.ctrlKey) {
                this.toggleDocument();
            }

        })
    }

    formatCode() {
        let rawCode = this.editor.getValue();

        // separate imports and code
        let imports = '';
        let code = '';

        rawCode.split('\n').forEach(line => {
            if (line.startsWith('import')) {
                imports += line + '\n';
            } else {
                code += line + '\n';
            }
        });

        // Format import in the top and code in the bottom
        return imports + '\n' + `(() => { try { ${code} } catch (e) { console.error(e.message || e); parent.window.console.error(e) } })()`;
    }

    get importingModules() {
        return this.editor.getValue().includes('import');
    }

    get isDOMOperation() {
        return this.editor.getValue().includes('document');
    }

    runCode = () => {
        const iFrame = document.getElementById('output-frame');
        iFrame.contentWindow.document.body.innerHTML = '';

        // Debugger.
        const debugScript = document.createElement('script');
        debugScript.innerHTML = `
        window.console = {
            ...console,
            log: parent.window.__customConsole.log,
            error: parent.window.__customConsole.error,
            warn: parent.window.__customConsole.warn,
            info: parent.window.__customConsole.info,
            clear: parent.window.__customConsole.clear
        }
        `
        iFrame.contentWindow.document.body.appendChild(debugScript);

        // Runner code.
        const script = document.createElement('script');
        script.type = 'module';

        script.innerHTML = this.formatCode();
        iFrame.contentWindow.document.body.appendChild(script);
        
        // Reset iFrame.
        iFrame.contentWindow.document.body.innerHTML = '';
    }

    clearConsole() {
        this.$('#console-output').innerHTML = '';
    }
}

TryJS.init();