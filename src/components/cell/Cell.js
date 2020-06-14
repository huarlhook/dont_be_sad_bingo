import React from 'react';
import './cell.css';

const Cell = ({ value, children, index, handler }) => {
    const update = (event) => {
        event.stopPropagation();
        handler(index);
    };

    return (
        <div className="cell">
            <div onClick={update} className={ value === 1 ? 'cell-content-active' : 'cell-content'}>{children}</div>
        </div>
    );
};

export default Cell;
