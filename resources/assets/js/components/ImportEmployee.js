import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

export default class ImportEmployee extends Component {

    constructor (props) {
        super(props);

        this.state = {
            errors: null,
            success: null,
            employees: null,
            didReceiveResponse: false,
            error: null
        }
    }


    render() {

        const componentConfig = {
            iconFiletypes: ['.csv'],
            showFiletypeIcon: true,
            postUrl: '/employees/import',

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
            removedfile: (file) => {
                console.log('file removed', file);
            },
            thumbnail: null,
            error: (file, error) => {
                this.setState({
                    error: error.message || error
                });
            },
            processing: (file) => {
                this.setState({
                    error: null
                });
            },
            uploadprogress: (file) => {
                console.log('upload progress')
            },
            sending: null,
            success: (file, response) => {
                this.setState({
                    errors: response.errors,
                    success: response.success,
                    employees: response.employees,
                    didReceiveResponse:  true,
                    error: null
                });
                console.log('success', file, response);
            },
            complete: (file, response) => {
                console.log('complete', file, response);
            },
            canceled: (file) => {
                console.log('canceled');
            },
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

        const { didReceiveResponse } = this.state

        return (

            <div className="container">
                <form action="">
                    <p>please choose .csv file to import employees</p>
                    <DropzoneComponent
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />
                </form>
                { }
                {didReceiveResponse ? this.renderResponse() : ''}
                { this.state.error ?
                    <div className="callout alert">{this.state.error}</div> :
                    null
                }
            </div>
        );
    }

    renderResponse () {
        const { errors, success } = this.state;

        return (
            <div className="margin-top">
                <div className='success'>
                    { success > 0 ? this.renderSuccess() : null }
                </div>
                <div className='error'>
                    { errors > 0 ? this.renderError() : null }
                </div>
            </div>
        )
    }

    renderSuccess () {
        const {success} = this.state;
        return (
            <div className="callout success">
                <h4>Success Employee Import: {success}</h4>
            </div>
        )
    }

    renderError () {
        const {errors, employees} = this.state;
        console.log(employees, 'employees');
        return (
            <div className="callout alert">
                <h4>Failed Employee Import: {errors}</h4>
                <h5>List of Failed Employees</h5>
                <table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>First name</td>
                            <td>Last name</td>
                            <td>Employee id</td>
                            <td>Error Code</td>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee, index) => {

                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{employee['first_name']}</td>
                                    <td>{employee['last_name']}</td>
                                    <td>{employee['employee_id']}</td>
                                    <td>{employee['error_code']}</td>
                                </tr>
                            )
                        })}
                    </tbody>


                </table>
            </div>
        )
    }
}

if (document.getElementById('employee-import')) {
    ReactDOM.render(<ImportEmployee />, document.getElementById('employee-import'));
}
