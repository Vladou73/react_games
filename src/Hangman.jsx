import { useEffect, useState } from "react"
import axios from 'axios';

function Hangman() {
    const [word, setWord] = useState("");
    const [lives, setLives] = useState(1);
    const [wordA, setWordA] = useState([])
    const [gameStatus, setGameStatus] = useState("pending")
    
    useEffect(()=> {
        resetGame()
    }, [])

    useEffect(() => {
        if (lives < 1)
            setGameStatus("GAME OVER");
    }, [lives])
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    const updateWordA = (indexes, letter) => {
        let tmp = [...wordA]
        for (const idx of indexes)
            tmp[idx] = letter;
        setWordA(tmp);
        if (!tmp.includes(' '))
            setGameStatus("VICTORY !")
    }

    const handleClickAlpha = (letter) => {
        let indexes = []
        for (let i=0; i<word.length; i++) {
            if (word[i] === letter)
                indexes.push(i)
        }
        if (indexes.length)
            updateWordA(indexes, letter)
        else
            setLives(lives-1)
    }

    const resetGame = async () => {
        const response = await axios.get("https://random-word-api.herokuapp.com/word")
        const word = response.data[0]
        console.log(word);
        setWord(word);
        setLives(word.length < 3 ? 1 : word.length - 2);
        setWordA(Array(word.length).fill(' '))
        setGameStatus("pending")
    }
    
    return (
        <div className="gameContainer">
            <header>HANGMAN</header>
            <div>Remaining lives : {lives}</div>
            {gameStatus !== "pending" && <p>{gameStatus}</p>}
            {gameStatus === "GAME OVER" && <p>The word was {word}</p>}
            <div className="wordContainer">
                {wordA.map((e, idx) => {
                    return <pre key={idx} className="letterHide">{e}</pre>
                }) }
            </div>
            <ul className="alphabetContainer">
                {alphabet.split('').map((e, idx) => {
                    return <button  disabled={gameStatus !== "pending"} className="alphabetLetter" key={idx} onClick={() => handleClickAlpha(e)}>{e}</button>
                })}
            </ul>
            <button onClick={resetGame}>Reset Game</button>
        </div>
    )


}

export default Hangman