import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">Games</header>
            <nav>
                <ul>
                    <li><Link to={"/tictactoe"}>Tic Tac Toe</Link></li>
                    <li><Link to={"/hangman"}>Hangman</Link></li>
                    <li><Link to={"/starwars"}>Star Wars</Link></li>
                </ul>
            </nav>
      </div>
    )
}

export default Home