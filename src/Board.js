import React, { useState } from "react";
import SquareComponent from "./SquareComponent";


function Board() {
    const [square, setSquare] = useState([...Array(9).keys()]);//initial array 
    const [moves, setMoves] = useState(0);//moves counter
    const [startGame, setGame] = useState(false);//check status of the game

    //randomization of the array key(state variable) to start the game
    const shuffle = () => {
        const shuffledTiles = [
            ...square
                .filter((t) => t !== square.length - 1)
                .sort(() => Math.random() - 0.9),
            square.length - 1,
        ];
        setSquare(shuffledTiles)
        setGame(true)
        setMoves(0)

    }
    //toget position of the matrix for swapping
    const getPosition = (index) => {
        return {
            row: Math.floor(index / 3),
            col: index % 3,
        };
    }
    //user onClick on square component for swapping
    const handleSquareClick = (index) => {
        if (startGame != true)
            return
        const positionOfBlankCell = square.indexOf(square.length - 1);
        const { row: srcRow, col: srcCol } = getPosition(index);
        const { row: destRow, col: destCol } = getPosition(positionOfBlankCell);
        const positionResult = Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
        // const positionOfBlankCell = square.indexOf(square.length - 1);
        // const positionResult = (Math.abs(index - positionOfBlankCell) === 1 || Math.abs(index - positionOfBlankCell) === 3);
        if (positionResult != false) {
            const resultOfSwapping = [...square];
            [resultOfSwapping[index], resultOfSwapping[positionOfBlankCell]] = [resultOfSwapping[positionOfBlankCell], resultOfSwapping[index]];
            setSquare(resultOfSwapping)
            setMoves(moves + 1)
        }

    }
    //making initial state of the game on user onClick
    const stopGame = () => {
        setGame(false)
        setSquare([...Array(9).keys()])
    }
    function isSolved(data) {
        for (let i = 0, l = data.length; i < l; i++) {
            if (data[i] !== i) {
                return false;
            }
        }
        return true;
    }

    const winner = isSolved(square)
    return (
        <>
            <div className="container">
                {startGame && <div className="moveCounter">Total Moves: <span>{moves}</span></div>}
                {!startGame && <div className="gameStatus">Game not started Please start...!</div>}
                <hr></hr>
                <ul className="board">
                    {square.map((data, index) => (
                        <SquareComponent key={index} index={index} square={data} handleSquareClick={handleSquareClick} />))}
                </ul>
                <hr></hr>
                <div className="btn-container">
                    {!startGame ? (<button onClick={() => shuffle()}>Start Game</button>) : (<button onClick={() => shuffle()}>Restart</button>)}
                    <button onClick={() => stopGame()} >Stop Playing</button>
                </div>
            </div>
            {winner && startGame && <div>Puzzle solved</div>}
        </>
    );
}

export default Board;
