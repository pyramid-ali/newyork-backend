import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FetchingButton from "./FetchingButton";

export default class Example extends Component {

    constructor (props) {
        super(props);
        this.state = {
            fetching: false,
            error: null,
            files: []
        }
    }

    render() {
        const { fetching } = this.state;
        return (
            <div className="container">
                <p>please choose .csv file to import employees</p>
                <FetchingButton
                    fetching={fetching}
                    fetchingLabel='processing'
                    label='Export'
                    labelIcon='sign-out'
                    onClick={this.requestExport.bind(this)} />
                <div>
                    { this.renderFiles() }
                </div>
            </div>
        );
    }

    requestExport () {

        this.fetch();
        axios.post('/employees/export', {}, {
            headers: {

            }
        })
            .then((response) => {
                console.log(response.data, 'response');
                this.done();
                const csv = response.data.csv;
                this.setState({
                    files: [...this.state.files, {
                        filename: csv.filename,
                        title: csv.title,
                        format: csv.format
                    }]
                });
                console.log(response);
            })
            .catch((error) => {
                this.done();
                console.log(error);
            })
    }

    fetch () {
        this.setState({
            fetching: true
        });
    }

    done () {
        this.setState({
            fetching: false
        });
    }

    renderFiles () {


        const { files } = this.state;

        return (
            <div>
                {files.map((file, index) => {
                    return (
                        <div className="download-box" key={index}>
                            <h4>Your file is ready for download</h4>
                            <h5>Title: {file.title}</h5>
                            <p>Created at: {new Date().toDateString()}</p>
                            <a className="button success float-right" href={'/employees/export/download/' + file.filename}><i className="fa fa-download" /> Download</a>
                            <div className="clearfix"></div>
                        </div>
                    )
                })}
            </div>
        )
    }


}


if (document.getElementById('employee-export')) {
    ReactDOM.render(<Example />, document.getElementById('employee-export'));
}
