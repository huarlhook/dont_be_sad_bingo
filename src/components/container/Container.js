import React, {useState} from 'react';
import './container.css';
import bingoArray from "../../bingoes";
import Cell from "../cell/Cell";

const Container = (props) => {
    const [arr, updateArr] = useState(Array(25).fill(0));

    const handler = (event) => {

        const newArr = [...arr];
        newArr[event] = newArr[event] ? 0 : 1;

        updateArr(newArr);
    };

    const cards = bingoArray.map((text, index) => {
        return (
            <Cell key={index} test={arr[index]} index={index} handler={handler}>{text}</Cell>
        );
    });

    return (
        <div className="container">
            { cards }
        </div>
    );
};

export default Container;

