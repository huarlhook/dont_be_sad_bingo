import React from 'react';
import PropTypes from 'prop-types';
import Cell from "../cell/Cell";
import './container.css';

const Container = (props) => {
    return <div className="container">
        { props.children }
    </div>;
};

export default Container;

