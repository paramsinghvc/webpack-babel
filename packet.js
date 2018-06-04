(function run(modules) {
    const loadedModules = {};
    function loadModule(moduleId) {
        const module = {
            id: moduleId,
            loaded: false,
            exports: {},
        };
        // const mappedModule = modules[moduleId !== './src/index.js' ? getRelativePath('./src/index.js', moduleId) : moduleId];
        const mappedModule = modules[moduleId];
        return mappedModule.call(module.exports, module, module.exports, loadModule);
    }
    loadModule('./src/index.js');
})({'./src/index.js': function anonymous(module,exports,require
/**/) {
'use strict';

var _moduleA = require('/src/moduleA.js');

var _moduleA2 = _interopRequireDefault(_moduleA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var age = 19;
// require.ensure(['./moduleB.js'], function (require) {
//     var f = require('./moduleB.js');
// })

console.log(age);
if (module.hot) {
    module.hot.accept();
}
}, 
'/src/moduleA.js': function anonymous(module,exports,require
/**/) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sayBye = exports.sayHello = undefined;

var _moduleB = require('/src/moduleB.js');

var abc = _interopRequireWildcard(_moduleB);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var sayHello = exports.sayHello = function sayHello(name) {
  return console.log('Hello ' + name);
};
var sayBye = exports.sayBye = function sayBye(name) {
  return console.log('Hello ' + name);
};
var foo = 'bar';
exports.default = foo;
}, 
'/src/moduleB.js': function anonymous(module,exports,require
/**/) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person() {
    _classCallCheck(this, Person);

    this.name = 'abc';
};

exports.default = Person;
}})