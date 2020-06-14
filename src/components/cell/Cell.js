import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './cell.css';

const Cell = props => {
    const [activeClass, updateClass] = useState('cell-content');

    const update = (event) => {
        event.stopPropagation();
        props.handler(props.index);
        updateClass(activeClass === 'cell-content'
            ? 'cell-content-active'
            : 'cell-content');
    };

    return (
        <div className="cell">
            <div data-index={props.index} onClick={update} className={activeClass}>{props.children} {props.test}</div>
        </div>
    );
};

Cell.propTypes = {
    cellTrigger: PropTypes.func,
};

export default Cell;
