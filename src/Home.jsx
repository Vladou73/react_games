import TicTacToe from './TicTacToe';
import Hangman from './Hangman';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">Games</header>
            <nav>
                <ul>
                    <li><Link to={"/tictactoe"}>Tic Tac Toe</Link></li>
                    <li><Link to={"/hangman"}>Hangman</Link></li>
                </ul>
            </nav>
      </div>
    )
}

export default Home