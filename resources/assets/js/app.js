
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

require('./bite/app');
// require('./bite/app.init.overlay');
// require('./bite/app-style-switcher');
require('./bite/waves');
// require('./bite/sidebarmenu');
require('./bite/custom');


/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/ImportEmployee');
// require('./components/ExportEmployee');
// require('./components/PayrollProcess');

// window.axios.get('/me').then(response => {
//     const user = response.data.user;
//     window.Echo.private('payrolls.user.' + user.id)
//         .listen('.processed', (e) => {
//             console.log(e);
//             const r = confirm('payroll with #' + e.payroll.id + ' id processed, do you want to download?');
//             console.log(window.location);
//             if (r) {
//                 window.location.href = window.location.origin + `/payroll/${e.payroll.id}/output/download`
//             } else {
//                 if (window.location.pathname.includes('/payrolls/history')) {
//                     document.location.reload();
//                 }
//             }
//
//
//         })
//         .listen('.error', (e) => {
//             alert('payroll process failed');
//             if (window.location.pathname.includes('/payrolls/history')) {
//                 document.location.reload();
//             }
//
//         });
// })
window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('card', require('./components/Card.vue'));
Vue.component('card-header', require('./components/CardHeader.vue'));
Vue.component('card-body', require('./components/CardBody.vue'));
Vue.component('card-group', require('./components/CardGroup.vue'));
Vue.component('wizard', require('./pages/Wizard.vue'));

const app = new Vue({
    el: '#main-wrapper'
});