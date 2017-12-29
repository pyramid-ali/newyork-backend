import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

export default class PayrollProcess extends Component {

    constructor (props) {
        super(props);

        this.state = {
            error: null,
            payroll: null,
            processing: false,
            misc: false,
            success: false,
            failue: null
        }
    }


    render() {

        const componentConfig = {
            iconFiletypes: ['.csv'],
            showFiletypeIcon: true,
            postUrl: '/payroll/process',

        };

        const eventHandlers = {
            init: null,
            // All of these receive the event as first parameter:
            drop: null,
            dragstart: null,
            dragend: null,
            dragenter: null,
            dragover: null,
            dragleave: null,
            // All of these receive the file as first parameter:
            addedfile: null,
            removedfile: null,
            thumbnail: null,
            error: (file, error) => {
                this.setState({
                    error: error,
                    payroll: null
                });
                console.log('error', file, error);
            },
            processing: null,
            uploadprogress: null,
            sending: null,
            success: (file, response) => {
                this.setState({
                    error: null,
                    payroll: response.payroll
                });
            },
            complete: null,
            canceled: null,
            maxfilesreached: null,
            maxfilesexceeded: null,
            // All of these receive a list of files as first parameter
            // and are only called if the uploadMultiple option
            // in djsConfig is true:
            processingmultiple: null,
            sendingmultiple: null,
            successmultiple: null,
            completemultiple: null,
            canceledmultiple: null,
            // Special Events
            totaluploadprogress: null,
            reset: null,
            queuecomplete: null
        };

        const djsConfig = {
            addRemoveLinks: true,
            autoProcessQueue: true,
            acceptedFiles: 'text/csv,application/vnd.ms-excel',
            params: {
                '_token': $('meta[name="csrf-token"]').attr('content')
            }
        };

        const { didReceiveResponse } = this.state;

        return (

            <div className="container">
                <form action="">
                    <p>please choose .csv Payroll Grid to Process</p>
                    <DropzoneComponent
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />
                </form>
                {this.renderResponse()}

            </div>
        );
    }


    renderResponse () {
        const { error, payroll, success } = this.state;
        return (
            <div className="margin-top">
                { payroll !== null ? this.renderPayroll(payroll) : null }
                { success ? this.renderSuccessMessage() : null }
                { error !== null  ? this.renderError(error) : null }
            </div>
        )
    }

    renderError (error) {

        const { employees, service_codes } = error;

        return (
            <div className='callout large alert'>
                <h5>Some Error Happens, please review it</h5>
                <div className="missing-employees">
                    <h4>The following employee IDs are missing</h4>
                    <ul className='missing-employee-list'>
                        {employees.map((id) => {
                            return (
                                <li key={id}>{id}</li>
                            )
                        })}
                    </ul>
                    <div className="clearfix"></div>
                </div>
                <div className="missing-services">
                    <h4>the following Service Codes are missing</h4>
                    <ol>
                        {service_codes.map((code, index) => {
                            return (
                                <li key={index}>{code}</li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )

    }

    renderSuccessMessage () {
        return <div className='callout large success'>
            <h4>Payroll Successfully queued</h4>
            <p>when processing finish we notify you here and by your email</p>
        </div>
    }

    renderPayroll (payroll) {

        return (
            <div className='callout large success'>
                <h4>Payroll Reviewed Successfully</h4>
                <p>You can now process reviewed payroll, you can close this window any time you want, we notify you when payroll processed</p>
                <input type="checkbox" value={this.state.misc} /> Include Miscellaneous Benefits in output
                <div className="button-group">
                    <button className="button success" onClick={this.processPayroll.bind(this)} disabled={this.state.processing}>
                        { this.state.processing ?
                            <span><i className="fa fa-spin fa-spinner"></i></span> :
                            <span>Process Payroll</span>
                        }
                    </button>
                </div>
            </div>
        );
    }

    processPayroll () {
        this.setState({
            processing: true
        });

        console.log(this.state.payroll, 'payroll');

        window.axios.post('/payroll/' + this.state.payroll.id + '/output', {
            miscellaneous: this.state.misc,
            _token: $('meta[name="csrf-token"]').attr('content')
        }).then((response) => {
            this.setState({
                success: true,
                processing: false
            })
        }).catch(failure => {
            this.setState({
                failure,
                success: false,
                processing: false
            })
        })
    }
}

if (document.getElementById('payroll-process')) {
    ReactDOM.render(<PayrollProcess />, document.getElementById('payroll-process'));
}

