import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FetchingButton = (props) => {

    const {fetching, onClick, fetchingLabel, label, labelIcon} = props;

    if (fetching) {
        return (
            <button className="button primary"
                    onClick={props.onClick}
                    disabled>
                <i className="fa fa-spin fa-spinner" /> {fetchingLabel}
            </button>
        )
    }
    else {
        return (
            <button className="button primary"
                    onClick={props.onClick}>
                <i className={'fa fa-' + labelIcon} /> {label}
            </button>
        )
    }

};

export default FetchingButton;