import { useEffect, useState } from "react";

const sideLength = 4;
const checkLines = (grid) => {
    let tmp;
    for (let i=0; i<sideLength; i++) {
        tmp = grid.slice(i * sideLength, (i + 1) * sideLength)
        if (tmp.every((e)=>e === tmp[0]) && !tmp.includes(undefined))
            return tmp[0]
    }
}

const checkCols = (grid) => {
    for (let i=0; i<sideLength; i++) {
        for (let j=0; j<sideLength; j++) {
            if (grid[i + sideLength*j] !== grid[i] || grid[i + sideLength*j] === undefined)
                break
            if (j === sideLength - 1)
                return grid[i]
        }
    }
}

const checkDiags = (grid) => {
    for (let j=1; j<sideLength; j++) {
        if (grid[j + sideLength*j] !== grid[0] || grid[j + sideLength*j] === undefined)
            break
        if (j === sideLength - 1)
            return grid[0]
    }
    for (let j=0; j<sideLength; j++) {
        if (grid[sideLength - j - 1 + sideLength*j] !== grid[sideLength - 1] || grid[sideLength - j - 1 + sideLength*j] === undefined)
            break
        if (j === sideLength - 1)
            return grid[sideLength - 1]
    }
}


export const Cell = ({handleClick, value, index}) => {
    return (
        <button className="cell" onClick={()=>{handleClick(index)}}>{value}</button>
    )
}

const TicTacToe = () => {
    const [turn, setTurn] = useState(true)
    const [grid, setGrid] = useState(Array(sideLength*sideLength).fill(null))
    const [disableReset, setDisableReset] = useState(true)
    const [victory, setVictory] = useState({victory:false, winner:""})

    const generateLine = (lineIdx) => {
        let line = [];
        for (let i=0; i<sideLength; i++) {
            line.push(
                <Cell 
                    key={i}
                    handleClick={handleClick}
                    value={grid[i + (lineIdx * sideLength)]}
                    index={i + (lineIdx * sideLength)}
                ></Cell>)
        }
        return line;
    }

    const generateGrid = () => {
        let tmp = [];
        for (let i=0; i<sideLength; i++) {
            tmp.push(<div key={i}>{generateLine(i)}</div>)
        }
        return tmp;
    }

    const resetGrid = () => {
        setGrid(new Array(sideLength*sideLength))
        setDisableReset(true)
        setVictory({victory:false, winner:""})
    }

    const handleClick = (index) => {
        console.log(index)
        if (!grid[index]) {
            let tmp = grid;
            if (turn)
                tmp[index] = "X"
            else
                tmp[index] = "0"
            setTurn(!turn)
            setGrid(tmp)
            let testWin = checkLines(tmp) || checkCols(tmp) || checkDiags(tmp)
            if (testWin){
                setVictory({victory:true, winner: testWin})
                setDisableReset(false);
            }
            if (!tmp.includes(undefined))
                setDisableReset(false);
        }
    }

    return (
        <div className="gameContainer">
            <div>Tic Tac Toe</div>
            {generateGrid()}
            <button disabled={disableReset} onClick={resetGrid} style={{marginTop:"1rem"}}>Reset game</button>
            <p hidden={!victory.victory}>{victory.winner} WON THE GAME !</p>
        </div>
    )
}

export default TicTacToe;