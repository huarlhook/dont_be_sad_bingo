function isChecked(state, index) {
    return (state >> index) & 1;
}

function setChecked(state, index, flag) {
    return flag ? state | (1 << index) : state & ~(1 << index);
}

export { isChecked, setChecked };
