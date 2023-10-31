import { useState } from "react"






export function GameContainer({word}) {
    const [lives, setLives] = useState(word.length - 2);
    const [wordA, setWordA] = useState(Array(word.length).fill(' '))

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const handleClickAlpha = (letter) => {
        let indexes = []
        for (let i=0; i<word.length; i++) {
            if (word[i] === letter)
                indexes.push(i)
        }
        if (indexes.length) {
            let tmp = [...wordA]
            for (const idx of indexes)
                tmp[idx] = letter;
            setWordA(tmp);
        }
    }
    

    return (
        <div>
            <div>{lives}</div>
            <div className="wordContainer">
                {wordA.map((e, idx) => {
                    return <pre key={idx} className="letterHide">{e}</pre>
                }) }
            </div>
            <ul className="alphabetContainer">
                {alphabet.split('').map((e, idx) => {
                    return <button className="alphabetLetter" key={idx} onClick={() => handleClickAlpha(e)}>{e}</button>
                })}
            </ul>


        </div>
    )


}




const Pendu = () => {

    return (
        <div>
            <header>Le jeu du pendu</header>
            <GameContainer word="jogging"></GameContainer>
        </div>
    )
}

export default Pendu