const path = require('path');
const babel = require("babel-core");
const chalk = require("chalk");
const fs = require('fs');

const ENTRY_FILE = './src/index.js';

const modules = {
};

function parseFile(filePath) {
    try {
        const data = babel.transformFileSync(path.join(__dirname, filePath), {
            "presets": [
                "env"
            ]
        });

        const { metadata: { modules: { imports } }, code } = data;
        const modId = filePath;
        modules[modId] = {};
        modules[modId].imports = imports.map(({ source, imported }) => ({
            source: source,
            imported
        }));
        modules[modId].code = code;
        imports.forEach(imp => {
            parseFile(imp.source);
        });
    } catch (e) {
        console.error(e);
    }
    /* End of Recursion */
    if (filePath === ENTRY_FILE) {
        logModules();
        // const __modules = constructModules();
        // console.log(__modules);
        // run(__modules);
        writeBundle();
    }
}
parseFile(ENTRY_FILE);

function getRelativePath(from, to) {
    return './' + path.relative('./', path.resolve(path.dirname(from), to));
}
function logModules() {
    console.log('modules', chalk.bold.cyan(JSON.stringify(modules, null, 2)));
}


function run(modules) {
    const loadedModules = {};
    function loadModule(moduleId) {
        const module = {
            id: moduleId,
            loaded: false,
            exports: {},
        };
        // const mappedModule = modules[moduleId !== ENTRY_FILE ? getRelativePath(ENTRY_FILE, moduleId) : moduleId];
        const mappedModule = modules[moduleId];
        return mappedModule.call(module.exports, module, module.exports, loadModule);
    }
    loadModule(ENTRY_FILE);
}

function constructModules() {
    const constructedModules = {};
    Object.keys(modules).forEach(moduleId => {
        constructedModules[moduleId] = wrapModule(moduleId);
    });
    return constructedModules;
}

function wrapModule(moduleId) {
    const mod = modules[moduleId];
    return new Function('module', 'exports', 'require', mod.code);
}

function stringifyConstructedModules(cModules) {
    let result = '{';
    Object.keys(cModules).forEach((cModule, index) => {
        const isLast = index === Object.keys(cModules).length - 1;
        result += `'${cModule}': ${cModules[cModule].toString()}${isLast ? '}' : ', \n'}`;
    });
    return result;
}

function writeBundle() {
    const constructedModules = constructModules();
    const data = `(${run.toString().replace(/ENTRY_FILE/g, `'${ENTRY_FILE}'`).replace(/const mappedModule.*\n$/g, 'const mappedModule=modules[moduleId]')})(${stringifyConstructedModules(constructedModules)})`;
    fs.writeFile('./packet.js', data, 'utf-8', function (err) {
        if (err) {
            console.error('Error writing the bundle', err);
        }
    })

}