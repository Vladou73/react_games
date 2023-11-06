import './App.css';
import {Routes, Route} from "react-router-dom"

import Home from "./Home"
import TicTacToe from './TicTacToe';
import Hangman from './Hangman';

function App() {
  return (
    <Routes>
      <Route path="/" element ={<Home />}/>
      <Route path="/tictactoe" element ={<TicTacToe />}/>
      <Route path="/hangman" element ={<Hangman />}/>
    </Routes>
  )
}

export default App;
