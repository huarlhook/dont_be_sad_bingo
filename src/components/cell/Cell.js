import React from 'react';
import PropTypes from 'prop-types';
import './cell.css';

const Cell = props => {
    console.log(props);

    const onClick = () => {
        alert('click!');
    };

    console.log(
        window.document.body.clientWidth
    );

    return <div className="cell">
                <div className="cell-content" onClick={onClick}>{props.children}</div>
           </div>

};

Cell.propTypes = {
    idd: PropTypes.number,
    cellTrigger: PropTypes.func,
};

export default Cell;
