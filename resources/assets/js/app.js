
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/ImportEmployee');
require('./components/ExportEmployee');
require('./components/PayrollProcess');



window.axios.get('/me').then(response => {
    const user = response.data.user;
    window.Echo.private('payrolls.user.' + user.id)
        .listen('.processed', (e) => {
            console.log(e);
            const r = confirm('payroll with #' + e.payroll.id + ' id processed, do you want to download?');
            console.log(window.location);
            if (r) {
                window.location.href = window.location.origin + `/payroll/${e.payroll.id}/output/download`
            } else {
                if (window.location.pathname.includes('/payrolls/history')) {
                    document.location.reload();
                }
            }


        })
        .listen('.error', (e) => {
            alert('payroll process failed');
            if (window.location.pathname.includes('/payrolls/history')) {
                document.location.reload();
            }

        });
})


