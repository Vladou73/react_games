import './App.css';
import {Routes, Route} from "react-router-dom"

import Home from "./Home"
import TicTacToe from './TicTacToe';
import Hangman from './Hangman';
import StarWars from "./StarWars";

function App() {
  return (
    <Routes>
      <Route path="/" element ={<Home />}/>
      <Route path="/tictactoe" element={<TicTacToe />}/>
      <Route path="/hangman" element={<Hangman />}/>
      <Route path='/starwars' element={<StarWars />} />
    </Routes>
  )
}

export default App;
