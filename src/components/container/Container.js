import React from 'react';
import './container.css';
import bingoArray from "../../bingoes";
import Cell from "../cell/Cell";
import {isChecked, setChecked} from "../../helpers/bitStorage";

const Container = ({ fieldStore, updateField }) => {
    const handler = (index) => {
        const after = !isChecked(fieldStore, index);
        const newFieldStore = setChecked(fieldStore, index, after);
        updateField(newFieldStore);
    };

    const cards = bingoArray.map((text, index) => {
        return (
            <Cell key={index} index={index} handler={handler} value={isChecked(fieldStore, index)}>{text}</Cell>
        );
    });

    console.log('Hash: ', fieldStore);

    return (
        <div className="container" id="container">
            { cards }
        </div>
    );
};

export default Container;

