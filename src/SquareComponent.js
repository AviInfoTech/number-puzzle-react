import React from "react";

function SquareComponent(props) {
    const { square, index, handleSquareClick } = props;

    return (
        <>
            <li style={{ opacity: square === 8 ? 0 : 1 }} className="square-design" onClick={() => handleSquareClick(index)}>
                <span> {`${square + 1}`} </span>
            </li>

        </>
    );
}

export default SquareComponent;
