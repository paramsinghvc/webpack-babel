import abc from '/src/moduleA.js';
const age = 19;
// require.ensure(['./moduleB.js'], function (require) {
//     var f = require('./moduleB.js');
// })

console.log(age);
if (module.hot) {
    module.hot.accept();
}